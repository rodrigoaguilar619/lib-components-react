import BootstrapButton from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { TooltipIdCustomEnum } from '@app/catalogs/enumCatalog';
import { Tooltip } from 'react-tooltip';
import { ReactNode } from 'react';

/**
 * Builds and returns a Bootstrap button with the provided label, icon, onClick handler, size, tooltip ID, and tooltip content.
 *
 * @param {string | undefined} label - The label for the button
 * @param {IconProp | undefined} icon - The icon for the button
 * @param {any} onClick - The onClick handler for the button
 * @param {"sm" | "lg" | undefined} size - The size of the button
 * @param {string | undefined} tooltipId - The tooltip ID for the button
 * @param {string | undefined} tooltip - The tooltip content for the button
 * @return {JSX.Element} The Bootstrap button component
 */
export const ButtonComponent = (props: { label?: string, icon?: IconProp, onClick: any, size?: "sm" | "lg", tooltipId?: string, tooltip?: string }) => {

    return (<BootstrapButton variant="primary" onClick={props.onClick} size={props.size} data-tooltip-id={props.tooltipId} data-tooltip-content={props.tooltip}>
        {props.icon !== undefined ? <FontAwesomeIcon icon={props.icon} /> : null} {props.label}
    </BootstrapButton>)
}

/**
 * Build a submit button with the given label and onClick handler.
 *
 * @param {string | undefined} label - The label for the button
 * @param {any} onClick - The onClick handler for the button
 * @return {JSX.Element} The submit button element
 */
export const ButtonSubmitComponent = (props: { label: string, onClick: any }) => {
    return (<div style={{ textAlign: "left", paddingRight: "10px" }}>{ButtonComponent({label: props.label,  icon: faSave, onClick: props.onClick, tooltipId: TooltipIdCustomEnum.TOOLTIP_CUSTOM})}</div>);
}

/**
 * Function to build a button for search.
 *
 * @param {string | undefined} label - the label for the button
 * @param {any} onClick - the function to be called when the button is clicked
 * @return {JSX.Element} the button component for search
 */
export const ButtonSearchComponent = (props: { label: string, onClick: any }) => {
    return (<div style={{ textAlign: "left", paddingRight: "10px" }}>{ButtonComponent({label: props.label, icon: faSearch, onClick: props.onClick, tooltipId: TooltipIdCustomEnum.TOOLTIP_CUSTOM})}</div>);
}

/**
 * Builds a button option with the provided label, icon, onClick handler, and optional tooltip.
 *
 * @param {string | undefined} label - the label for the button
 * @param {IconProp | undefined} icon - the icon for the button
 * @param {any} onClick - the onClick handler for the button
 * @param {string} [tooltip] - optional tooltip for the button
 * @return {type} the built button option
 */
export const ButtonDataTableOptionComponent = (props: { label?: string, icon?: IconProp, onClick: any, tooltip?: string }) => {
    return ButtonComponent({label: props.label, icon: props.icon, onClick: props.onClick, size: "sm", tooltipId: TooltipIdCustomEnum.TOOLTIP_CUSTOM, tooltip: props.tooltip});
}

/**
 * Builds a button option on nested button option and a tooltip.
 *
 * @param {string} idTooltip - the id for the tooltip
 * @param {React.ReactNode} tooltipOptions - optional tooltip options
 * @return {React.ReactNode} the button with nested options and tooltip
 */
export const ButtonDataTableOptionNestedComponent = (props: { label?: string, icon?: IconProp, onClick: any, tooltip?: string }) => {
    return ButtonComponent({label: props.label, icon: props.icon, onClick: props.onClick, size: "sm", tooltipId: TooltipIdCustomEnum.TOOLTIP_BUTTON_NESTED_OPTIONS, tooltip: props.tooltip});
}

/**
 * Builds a button with nested options and a tooltip.
 *
 * @param {string} idTooltip - the id for the tooltip
 * @param {React.ReactNode} tooltipOptions - optional tooltip options
 * @return {React.ReactNode} the button with nested options and tooltip
 */
export const ButtonWithNestedOptionsComponent = (props: { idTooltip: string, buttonOptions: ReactNode[] }) => {
    return (<div>
        <div data-tooltip-id={"tooltip_nested_options_" + props.idTooltip}>
            {ButtonComponent({label: "...", size: "sm", onClick: () => {}})}
        </div>
        <Tooltip id={"tooltip_nested_options_" + props.idTooltip} delayHide={0} clickable={true} /*events={['click']}*/ place={"right"} offset={3}>
            {ButtonsOrganizerComponent({buttonOptions: props.buttonOptions})}
        </Tooltip>
    </div>);
}

/**
 * Organizes the given buttons in a flex container with specified justifyContent.
 *
 * @param {ReactNode[]} buttonOptions - an array of React nodes representing the buttons
 * @param {string | undefined} justifyContent - the value for the justifyContent property of the flex container
 * @return {ReactElement} the organized buttons wrapped in a flex container
 */
export const ButtonsOrganizerComponent = (props: { buttonOptions: ReactNode[], justifyContent?: string }) => {
    return (
        <div style={{ display: "flex", gap: "3px", alignItems: "center", justifyContent: props.justifyContent ?? "center" }}>
            {props.buttonOptions.map((button, index) => (
                <div key={index}>{button}</div>
            ))}
        </div>
    );
}

/**
 * Builds a custom button with the given label, icon, and onClick handler.
 *
 * @param {string | undefined} label - the label for the button
 * @param {IconProp | undefined} icon - the icon for the button
 * @param {any} onClick - the onClick handler for the button
 * @return {type} the constructed button
 */
export const ButtonCustomComponent = (props: { label?: string, icon?: IconProp, onClick: any, tooltip?: string }) => {
    return ButtonComponent({label: props.label, icon: props.icon, onClick: props.onClick, tooltipId: TooltipIdCustomEnum.TOOLTIP_CUSTOM, tooltip: props.tooltip});
}