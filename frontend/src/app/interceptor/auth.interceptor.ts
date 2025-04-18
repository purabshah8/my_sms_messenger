import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    const authRequest = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    });

    return next(authRequest);
  }

  return next(req);
};
