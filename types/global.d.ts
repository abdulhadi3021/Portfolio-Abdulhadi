// types/global.d.ts
import 'react';

declare global {
  namespace React {
    interface FunctionComponent<P = {}> {
      (props: P): ReactElement | null;
    }
  }
}