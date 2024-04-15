import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { verifyHasValue } from "@app/utils/dataUtils/verifyDataUtil";
import { TooltipIdCustomEnum } from "@app/catalogs/enumCatalog";

/**
 * Builds labels with an optional icon and tooltip help text.
 *
 * @param {string} label - the main label for the column
 * @param {IconProp} [icon] - optional icon to display alongside the label
 * @param {string} [tooltipHelpText] - optional help text for the tooltip
 * @return {JSX.Element} a JSX element representing the built column label
 */
export const LabelInputComponent = (props: { label: string, tooltipHelpText?: string, icon?: IconProp }) => {

    let styles = {};

    if (verifyHasValue(props.label)) {
        styles = { paddingLeft: "3px" };
    }

    return (<span style={styles}>{props.label}{verifyHasValue(props.label) ? "\u00A0" : null}
        {props.tooltipHelpText && props.icon
            ? <FontAwesomeIcon icon={props.icon} data-tooltip-id={TooltipIdCustomEnum.TOOLTIP_INPUT_HELP} data-tooltip-html={props.tooltipHelpText} />
            : null}
    </span>);
}