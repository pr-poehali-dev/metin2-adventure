import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (username: string) => void;
}

const LoginModal = ({ open, onOpenChange, onSuccess }: LoginModalProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/175ba1a7-d11f-4677-9873-cd3e727d93fd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'login',
          ...formData
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSuccess(data.username);
        onOpenChange(false);
        setFormData({ username: '', password: '' });
      } else {
        setError(data.error || 'Ошибка входа');
      }
    } catch (err) {
      setError('Ошибка подключения к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-2xl text-card-foreground">Вход в аккаунт</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Войдите в свой аккаунт и продолжите приключение
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="login-username">Логин</Label>
            <Input
              id="login-username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Введите логин"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="login-password">Пароль</Label>
            <Input
              id="login-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Введите пароль"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
          >
            {loading ? 'Вход...' : 'Войти'}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-border"
          >
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
