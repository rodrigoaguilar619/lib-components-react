export const REDUCER_SET_SIDEBAR_SHOW_REDUCE = "REDUCER_SET_SIDEBAR_SHOW_REDUCE";
export const REDUCER_SET_SIDEBAR_SHOW = "REDUCER_SET_SIDEBAR_SHOW";

export const setSidebarShowAction = (sidebarShow: boolean) => ({
    type: REDUCER_SET_SIDEBAR_SHOW,
    sidebarShow,
  });

  export const setSidebarShowFoldableAction = (sidebarUnfoldable: boolean) => ({
    type: REDUCER_SET_SIDEBAR_SHOW_REDUCE,
    sidebarUnfoldable,
  });