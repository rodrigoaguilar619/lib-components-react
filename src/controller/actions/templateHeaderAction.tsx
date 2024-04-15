export const ACTION_TEMPLATE_HEADER_TITLE_SET = "ACTION_TEMPLATE_HEADER_TITLE_SET";
export const ACTION_TEMPLATE_HEADER_SUBTITLE_SET = "ACTION_TEMPLATE_HEADER_SUBTITLE_SET";

export const setTemplateHeaderTitleAction = (title: string) => ({
    type: ACTION_TEMPLATE_HEADER_TITLE_SET,
    title,
  });

export const setTemplateHeaderSubTitleAction = (subtitle: string) => ({
    type: ACTION_TEMPLATE_HEADER_SUBTITLE_SET,
    subtitle,
  });