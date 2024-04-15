import { TooltipIdCustomEnum } from "@app/catalogs/enumCatalog";
import { Tooltip } from "react-tooltip";

/**
 * build a custom tooltip configuration. options for general tooltips
 *
 * @return {JSX.Element} The custom tooltip component.
 */
 export const TooltipConfigCustom = () => {
    return (<Tooltip className="tooltip-custom" id={TooltipIdCustomEnum.TOOLTIP_CUSTOM} place="right" offset={3} opacity={1} />);
}

/**
 * build tooltip configuration for input help.
 *
 * @return {JSX.Element} Tooltip configuration element
 */
export const TooltipConfigInputHelp = () => {
    return (<Tooltip id={TooltipIdCustomEnum.TOOLTIP_INPUT_HELP} place="right" opacity={1} />);
}

/**
 * build the tooltip configuration for nested options button. tooltip for buttons inside tooltip
 *
 * @return {JSX.Element} The tooltip component for nested options button.
 */
export const TooltipConfigButtonNestedOptions = () => {
    return (<Tooltip id={TooltipIdCustomEnum.TOOLTIP_BUTTON_NESTED_OPTIONS} className="tooltip-button-nested-options" place="top" offset={5} noArrow />);
}