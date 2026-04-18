import { useState } from 'react';

import { useCreateReading } from '@/core/hooks/use-create-readings';

import { cn } from '@/lib/utils';
import { StarIcon } from 'lucide-react';

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
import { Genre } from '@/core/domain/entities/literary-genre';
import { toast } from 'sonner';

type CreateReadingDialogProps = {
  userId: string | null;
  book: {
    id: string;
    title: string;
    authorName: string;
    literaryGenres: Genre[];
  };
};

export function CreateReadingDialog({
  userId,
  book,
}: CreateReadingDialogProps) {
  const MAX_RATING = 5;

  const [open, setOpen] = useState(false);

  const { createReading, isCreatingReading } = useCreateReading();

  const [readingStatus, setReadingStatus] = useState<ReadingStatus>(
    ReadingStatus.READ,
  );
  const [rating, setRating] = useState<number>(1);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setOpen(false);

    try {
      if (!userId) return;

      await createReading({
        userId,
        book: {
          id: book.id,
          title: book.title,
          authorName: book.authorName,
          literaryGenres: book.literaryGenres,
        },
        status: readingStatus,
        rating,
      });
    } catch {
      if (readingStatus === ReadingStatus.READ) {
        toast.error(`Não foi possível ler "${book.title}".`);
      } else {
        toast.error(
          `Não foi possível adicionar "${book.title}" à sua lista de leituras.`,
        );
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="xs">Ler / Quero ler</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar leitura ({book.title})</DialogTitle>
          <DialogDescription>
            Leia este livro ou adicione à sua lista de espera para ler.
          </DialogDescription>
        </DialogHeader>

        <form id="create-reading-form" className="mt-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="flex items-center gap-4">
              <Label htmlFor="status">Status</Label>
              <RadioGroup
                defaultValue={readingStatus}
                disabled={isCreatingReading}
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
                          isCreatingReading
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
            disabled={isCreatingReading}
            type="submit"
            form="create-reading-form"
          >
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
