import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { OnlyUserNames } from '@/core/domain/types/only-user-names';
import { cn } from '@/lib/utils';

type UserSelectProps = {
  userId: string | null;
  users: OnlyUserNames[];
  onChangeUserId: (userId: string) => void;
  isLoading: boolean;
};

export function UserSelect({
  userId,
  users,
  onChangeUserId,
  isLoading,
}: UserSelectProps) {
  const selectUserPlaceholder = isLoading
    ? 'Carregando usuários...'
    : users.find((user) => user.id === userId)?.name || 'Selecione um usuário';

  return (
    <Select
      disabled={!users || isLoading}
      onValueChange={(value) => onChangeUserId(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder={selectUserPlaceholder} />
      </SelectTrigger>

      <SelectContent position="popper">
        {users?.map((user) => (
          <SelectItem
            key={user.id}
            value={user.id}
            className={cn(
              user.id === userId && 'bg-accent text-accent-foreground',
            )}
          >
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
