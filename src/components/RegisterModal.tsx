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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (username: string) => void;
}

const RegisterModal = ({ open, onOpenChange, onSuccess }: RegisterModalProps) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    character_name: '',
    character_class: 'Воин'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/175ba1a7-d11f-4677-9873-cd3e727d93fd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          ...formData
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onSuccess(data.username);
        onOpenChange(false);
        setFormData({
          username: '',
          email: '',
          password: '',
          character_name: '',
          character_class: 'Воин'
        });
      } else {
        setError(data.error || 'Ошибка регистрации');
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
          <DialogTitle className="font-cinzel text-2xl text-card-foreground">Регистрация</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Создайте аккаунт и начните своё приключение в мире Metin2
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username">Логин</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Введите логин"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Введите пароль"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="character_name">Имя персонажа</Label>
            <Input
              id="character_name"
              value={formData.character_name}
              onChange={(e) => setFormData({ ...formData, character_name: e.target.value })}
              placeholder="Имя вашего героя"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="character_class">Класс персонажа</Label>
            <Select 
              value={formData.character_class} 
              onValueChange={(value) => setFormData({ ...formData, character_class: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Воин">Воин</SelectItem>
                <SelectItem value="Маг">Маг</SelectItem>
                <SelectItem value="Ниндзя">Ниндзя</SelectItem>
                <SelectItem value="Шаман">Шаман</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleRegister}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground"
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
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

export default RegisterModal;
