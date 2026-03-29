import { useState } from 'react';

import { useUpdateReading } from '@/core/hooks/use-update-reading';

import { cn } from '@/lib/utils';
import { PencilIcon, StarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FieldDescription, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { ReadingStatus } from '@/core/domain/entities/reading';

type EditReadingDialogProps = {
  userId: string | null;
  bookTitle: string;
  reading: {
    id: string;
    status: ReadingStatus;
    rating?: number | null;
    fetchStatus?: 'pending' | 'error';
  };
};

export function EditReadingDialog({
  userId,
  bookTitle,
  reading,
}: EditReadingDialogProps) {
  const MAX_RATING = 5;

  const [open, setOpen] = useState(false);

  const { updateReading, isUpdatingReading } = useUpdateReading();

  const [readingStatus, setReadingStatus] = useState<ReadingStatus>(
    reading.status,
  );
  const [rating, setRating] = useState<number>(reading.rating ?? 0);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setOpen(false);

    setReadingStatus(reading.status);
    setRating(reading.rating ?? 0);

    try {
      await updateReading({
        userId,
        readingId: reading.id,
        data: {
          status: readingStatus,
          rating,
        },
      });
    } catch {
      // setOpen(true);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Editar leitura"
          title="Editar leitura"
          variant="ghost"
          size="icon-xs"
          disabled={reading.fetchStatus === 'pending'}
        >
          <PencilIcon className="text-primary size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar leitura ({bookTitle})</DialogTitle>
          <DialogDescription>
            Faça as alterações em sua leitura aqui. Clique em salvar quando
            terminar.
          </DialogDescription>
        </DialogHeader>

        <form id="edit-book-form" className="mt-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="flex items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <RadioGroup
                defaultValue={readingStatus}
                disabled={isUpdatingReading}
                className="flex items-center"
                onValueChange={(value: ReadingStatus) => {
                  setReadingStatus(value);

                  if (value === ReadingStatus.READ) {
                    setRating(1);
                  } else {
                    setRating(0);
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="read" value={ReadingStatus.READ} />
                  <Label htmlFor="read">Ler</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    id="read"
                    value={ReadingStatus.WANT_TO_READ}
                  />
                  <Label htmlFor="read">Quero ler</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <Label>Avaliação</Label>

                <div className="flex items-center gap-2">
                  {Array.from({ length: MAX_RATING }).map((_, index) => {
                    const ratingNumber = !rating ? 0 : rating;

                    return (
                      <Button
                        key={`edit-reading-dialog-${index}`}
                        variant="ghost"
                        size="icon-xs"
                        type="button"
                        disabled={
                          readingStatus === ReadingStatus.WANT_TO_READ ||
                          isUpdatingReading
                        }
                        className="hover:bg-transparent! hover:opacity-75"
                        onClick={() => setRating(index + 1)}
                      >
                        <StarIcon
                          className={cn(
                            'size-6 text-gray-200',
                            index + 1 <= ratingNumber && 'text-yellow-500',
                          )}
                        />
                      </Button>
                    );
                  })}
                </div>
              </div>

              <FieldDescription className="text-xs">
                Só é possível avaliar livros lidos.
              </FieldDescription>
            </div>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            disabled={isUpdatingReading}
            type="submit"
            form="edit-book-form"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
