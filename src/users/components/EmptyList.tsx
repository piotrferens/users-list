import { primaryTextStyles } from '../../shared/styles';

interface EmptyListProps {
  onRefetch: VoidFunction;
}

export const EmptyList = ({ onRefetch }: EmptyListProps) => (
  <div>
    <h3>Something went wrong</h3>
    <button onClick={onRefetch} css={primaryTextStyles}>
      Refetch
    </button>
  </div>
);
