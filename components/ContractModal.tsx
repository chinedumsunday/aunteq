import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ContractModalProps {
  artistName: string
  isOpen: boolean
  onClose: () => void
}

export default function ContractModal({ artistName, isOpen, onClose }: ContractModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-primary neon-text">Official Contract with {artistName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <h2 className="text-lg font-semibold mb-4">Terms and Conditions</h2>
          <p className="mb-4">
            This agreement is made between NFT Merch (hereinafter referred to as "the Company") and {artistName}{" "}
            (hereinafter referred to as "the Artist").
          </p>

          <h3 className="text-md font-semibold mb-2">1. Scope of Work</h3>
          <p className="mb-4">
            The Artist agrees to provide original NFT artwork to be used on merchandise sold by the Company.
          </p>

          <h3 className="text-md font-semibold mb-2">2. Compensation</h3>
          <p className="mb-4">
            The Artist will receive 20% of the net profits from the sale of merchandise featuring their artwork.
          </p>

          <h3 className="text-md font-semibold mb-2">3. Intellectual Property</h3>
          <p className="mb-4">
            The Artist retains all intellectual property rights to their original artwork. The Company is granted a
            non-exclusive license to use the artwork on merchandise.
          </p>

          <h3 className="text-md font-semibold mb-2">4. Term</h3>
          <p className="mb-4">
            This agreement is valid for a period of 2 years from the date of signing, with the option to renew upon
            mutual agreement.
          </p>

          <h3 className="text-md font-semibold mb-2">5. Termination</h3>
          <p className="mb-4">Either party may terminate this agreement with 30 days written notice.</p>

          <p className="mt-8">
            By clicking "I Agree" below, both parties acknowledge that they have read and understood this agreement and
            agree to be bound by its terms.
          </p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

