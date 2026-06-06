declare const LoadMoreElement: ({ threshold, loadMore, }: {
    threshold?: number;
    loadMore: () => void;
}) => import("react").JSX.Element;
export default LoadMoreElement;
