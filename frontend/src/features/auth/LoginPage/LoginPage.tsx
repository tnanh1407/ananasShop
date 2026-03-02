import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, { message: 'Email không được để trống' })
      .email({ message: 'Email không đúng định dạng' }),
    password: z
      .string()
      .min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    rememberMe: z.boolean().optional(),
  });

  // Trích xuất type từ shemma
  type LoginFormValues = z.infer<typeof loginSchema>;

  // 3. Khởi tạo React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Dữ liệu gửi đi:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Đăng nhập thành công ! ');
  };
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <img
        src="/loginBackground.png"
        alt="background_login"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 ">
        <form
          className="w-full max-w-md p-10 space-y-6 border shadow-2xl bg-white/95 border-border rounded-2xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* LOGO */}
          <div className="flex place-content-center">
            <img src="/logo-login.svg" alt="icon-login" />
            <span className="text-2xl font-bold">| ERP SYSTEM</span>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-base font-medium">Tài khoản</label>
            <input
              {...register('email')}
              autoFocus
              type="email"
              placeholder="Nhập email của bạn"
              className={`w-full px-4 py-3 text-sm transition border focus:outline-none focus:ring-2 rounded-2xl ${
                errors.email
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-border focus:ring-primary'
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-2">
            <label className="text-base font-medium">Mật khẩu</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                className={`w-full px-4 py-3 pr-12 text-sm transition border focus:outline-none focus:ring-2 rounded-2xl ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-200'
                    : 'border-border focus:ring-primary'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 flex items-center transition-colors border-none right-3 text-muted hover:text-primary"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="accent-primary"
              />
              <span>Ghi nhớ tài khoản</span>
            </label>
            <a href="/" className="transition-colors hover:text-primary">
              Quên mật khẩu?
            </a>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-sm font-semibold tracking-wider text-white uppercase transition bg-primary hover:opacity-90 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>

          <div className="text-sm text-center">
            Bạn chưa có tài khoản ?{' '}
            <a className="text-red-500" href="/">
              Đăng kí ngay
            </a>
          </div>
        </form>

        {/* FOOTER */}
        <span className="mt-8 text-base text-white/80">
          © 2026 Ananas. All rights reserved.
        </span>
      </div>
    </div>
  );
}
