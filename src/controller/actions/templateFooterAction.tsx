export const ACTION_TEMPLATE_FOOTER_TEXT_SET = "ACTION_TEMPLATE_FOOTER_TEXT_SET";

export const setTemplateFooterTextAction = (text: string) => ({
  type: ACTION_TEMPLATE_FOOTER_TEXT_SET,
  text,
});