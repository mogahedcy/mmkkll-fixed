export interface ValidationError {
  field: string;
  message: string;
}

export interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  message?: string;
  location?: string;
}

export class FormValidator {
  static validateName(name: string): ValidationError | null {
    if (!name || name.trim().length === 0) {
      return { field: 'name', message: 'الاسم مطلوب' };
    }
    if (name.length < 3) {
      return { field: 'name', message: 'الاسم يجب أن يكون على الأقل 3 أحرف' };
    }
    if (name.length > 50) {
      return { field: 'name', message: 'الاسم لا يجب أن يزيد عن 50 حرف' };
    }
    return null;
  }

  static validateEmail(email: string): ValidationError | null {
    if (!email || email.trim().length === 0) {
      return { field: 'email', message: 'البريد الإلكتروني مطلوب' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { field: 'email', message: 'البريد الإلكتروني غير صحيح' };
    }
    return null;
  }

  static validatePhone(phone: string): ValidationError | null {
    if (!phone || phone.trim().length === 0) {
      return { field: 'phone', message: 'رقم الهاتف مطلوب' };
    }
    const phoneRegex = /^(\+966|0)[0-9]{9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return { field: 'phone', message: 'رقم الهاتف غير صحيح' };
    }
    return null;
  }

  static validateMessage(message: string, minLength = 10): ValidationError | null {
    if (!message || message.trim().length === 0) {
      return { field: 'message', message: 'الرسالة مطلوبة' };
    }
    if (message.length < minLength) {
      return { field: 'message', message: `الرسالة يجب أن تكون على الأقل ${minLength} أحرف` };
    }
    return null;
  }

  static validateForm(data: FormData): ValidationError[] {
    const errors: ValidationError[] = [];

    if (data.name) {
      const nameError = this.validateName(data.name);
      if (nameError) errors.push(nameError);
    }

    if (data.email) {
      const emailError = this.validateEmail(data.email);
      if (emailError) errors.push(emailError);
    }

    if (data.phone) {
      const phoneError = this.validatePhone(data.phone);
      if (phoneError) errors.push(phoneError);
    }

    if (data.message) {
      const messageError = this.validateMessage(data.message);
      if (messageError) errors.push(messageError);
    }

    return errors;
  }

  static isFormValid(data: FormData): boolean {
    return this.validateForm(data).length === 0;
  }
}

export async function sendContactEmail(data: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return { success: true, message: 'تم إرسال رسالتك بنجاح!' };
  } catch (error) {
    return { success: false, message: 'حدث خطأ في إرسال الرسالة' };
  }
}
