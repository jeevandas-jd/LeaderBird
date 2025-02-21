declare module "react-swipeable-views" {
    import { ComponentType } from "react";
  
    export interface SwipeableViewsProps {
      index?: number;
      onChangeIndex?: (index: number, indexLatest: number) => void;
      enableMouseEvents?: boolean;
      disabled?: boolean;
      resistance?: boolean;
      animateHeight?: boolean;
      animateTransitions?: boolean;
      axis?: "x" | "x-reverse" | "y" | "y-reverse";
      children?: React.ReactNode;
    }
  
    const SwipeableViews: ComponentType<SwipeableViewsProps>;
    export default SwipeableViews;
  }
  