import Loader from "@components/global/Loader"

import { InfiniteScrollLoaderProps } from "@components/global/InfiniteScrollLoader/types";

const InfiniteScrollLoader = ({
  isLoading,
  targetRefCallback,
  isLastPage
}: InfiniteScrollLoaderProps) => {
  if (isLoading) return <Loader className="w-full flex items-center justify-center pb-5" />

  if (isLastPage) return <></>;

  return (
    <div ref={targetRefCallback}></div>
  )
}

export default InfiniteScrollLoader