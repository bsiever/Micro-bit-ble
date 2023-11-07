import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useMemo } from "react";

const UsableTooltip = ({title, placement, children, ...props}) => {
    const tooltipObject = useMemo(() => {
        return <Tooltip>{title}</Tooltip>
    }, [title])

    return <OverlayTrigger placement={placement} overlay={tooltipObject} {...props}>{children}</OverlayTrigger>
}

export default UsableTooltip;