import SwipeableViews, { SwipeableViewsProps } from "react-swipeable-views";
import { IRoundProps } from "./Rounds";
import { JSX } from "react";

export interface ISingleEliminationProps {
  rtl?: boolean;
  rounds: IRoundProps[];
  roundClassName?: string;
  mobileBreakpoint?: number;
  bracketClassName?: string;
  swipeableProps?: SwipeableViewsProps;
  roundTitleComponent?: (title: string | JSX.Element, roundIdx: number) => JSX.Element;
  renderSeedComponent?: (props: IRenderSeedProps) => JSX.Element;
  twoSided?: boolean;
}

export interface IRenderSeedProps {
  seed: any; // Replace `any` with the actual type
  breakpoint: number;
  roundIdx: number;
}
