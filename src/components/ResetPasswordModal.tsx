
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ResetPasswordModalProps {
  trigger?: React.ReactNode;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ trigger }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação do envio de e-mail
    setTimeout(() => {
      toast({
        title: "E-mail enviado",
        description: `Foi enviado um link para redefinição de senha para ${email}`,
        duration: 5000,
      });
      setIsSubmitting(false);
      setEmail('');
      
      // Fechar o modal após o envio
      const closeButton = document.querySelector('[data-reset-password-close]');
      if (closeButton instanceof HTMLButtonElement) {
        closeButton.click();
      }
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="link" className="text-sm">Esqueceu sua senha?</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Recuperação de Senha</DialogTitle>
          <DialogDescription>
            Digite seu e-mail abaixo e enviaremos instruções para redefinir sua senha.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">E-mail</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              required
              autoComplete="email"
            />
          </div>
          <DialogFooter>
            <DialogClose data-reset-password-close asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isSubmitting || !email}
              className="bg-[#006837] hover:bg-[#004d29]"
            >
              {isSubmitting ? "Enviando..." : "Enviar Instruções"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
