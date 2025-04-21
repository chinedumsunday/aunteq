import { useToast as useToastPrimitive } from "@/hooks/use-toast"
import { ToastActionElement } from "@/components/ui/toast"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: ToastActionElement
}

export function useToast() {
  const { toast } = useToastPrimitive()

  return {
    toast: ({ title, description, variant, action }: ToastProps) => {
      toast({
        title,
        description,
        variant,
        action,
      })
    },
  }
}

export { ToastActionElement }

