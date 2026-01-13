/**
 * Assignment Service
 * 
 * Handles all assignment-related API operations.
 */

import { BaseService } from './base.service';
import type { IAssignmentService } from './interfaces';
import type { Assignment } from '@/types/assignments';

export class AssignmentService extends BaseService implements IAssignmentService {
  async getAll(): Promise<Assignment[]> {
    return this.request(() => 
      this.authorizedAPI.get<Assignment[]>('/assignments')
    );
  }

  async getById(id: string): Promise<Assignment> {
    return this.request(() => 
      this.authorizedAPI.get<Assignment>(`/assignments/${id}`)
    );
  }

  async create(data: Partial<Assignment> & { file?: File }): Promise<Assignment> {
    const formData = new FormData();
    
    // Add basic fields
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.course_id) formData.append('course_id', data.course_id);
    if (data.due_date) formData.append('due_date', data.due_date);
    if (data.assignment_type) formData.append('assignment_type', data.assignment_type);
    
    // Handle file upload or Google Form URL
    if (data.assignment_type === 'file' && data.file) {
      formData.append('file', data.file);
    } else if (data.assignment_type === 'google_form' && data.google_form_url) {
      formData.append('google_form_url', data.google_form_url);
    }

    return this.request(() => 
      this.authorizedAPI.post<Assignment>('/assignments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    );
  }

  async update(id: string, data: Partial<Assignment>): Promise<Assignment> {
    return this.request(() => 
      this.authorizedAPI.put<Assignment>(`/assignments/${id}`, data)
    );
  }

  async delete(id: string): Promise<void> {
    return this.request(() => 
      this.authorizedAPI.delete(`/assignments/${id}`)
    );
  }

  async getTeacherAssignments(): Promise<Assignment[]> {
    return this.request(() => 
      this.authorizedAPI.get<Assignment[]>('/assignments/teacher')
    );
  }

  async getStudentAssignments(): Promise<Assignment[]> {
    return this.request(() => 
      this.authorizedAPI.get<Assignment[]>('/assignments/student')
    );
  }

  async submit(assignmentId: string): Promise<void> {
    return this.request(() => 
      this.authorizedAPI.post(`/assignments/${assignmentId}/submit`)
    );
  }
}


