import React from "react";

import CONST from "./node.const";

import nodeHelper from "./node.helper";

/**
 * Node component is responsible for encapsulating node render.
 * @example
 * const onClickNode = function(nodeId) {
 *     window.alert('Clicked node', nodeId);
 * };
 *
 * const onRightClickNode = function(nodeId) {
 *     window.alert('Right clicked node', nodeId);
 * }
 *
 * const onMouseOverNode = function(nodeId) {
 *     window.alert('Mouse over node', nodeId);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *     window.alert('Mouse out node', nodeId);
 * };
 *
 * const generateCustomNode(node) {
 *     return <CustomComponent node={node} />;
 * }
 *
 * <Node
 *     id='nodeId'
 *     cx=22
 *     cy=22
 *     fill='green'
 *     fontSize=10
 *     fontColor='black'
 *     fontWeight='normal'
 *     dx=90
 *     label='label text'
 *     opacity=1
 *     renderLabel=true
 *     size=200
 *     stroke='none'
 *     strokeWidth=1.5
 *     svg='assets/my-svg.svg'
 *     type='square'
 *     viewGenerator={generateCustomNode}
 *     className='node'
 *     onClickNode={onClickNode}
 *     onRightClickNode={onRightClickNode}
 *     onMouseOverNode={onMouseOverNode}
 *     onMouseOutNode={onMouseOutNode} />
 */
export default class Node extends React.Component {
    /**
     * Handle click on the node.
     * @returns {undefined}
     */
    handleOnClickNode = () => this.props.onClickNode && this.props.onClickNode(this.props.id);

    /**
     * Handle right click on the node.
     * @param {Object} event - native event.
     * @returns {undefined}
     */
    handleOnRightClickNode = event => this.props.onRightClickNode && this.props.onRightClickNode(event, this.props.id);

    /**
     * Handle mouse over node event.
     * @returns {undefined}
     */
    handleOnMouseOverNode = () => this.props.onMouseOverNode && this.props.onMouseOverNode(this.props.id);

    /**
     * Handle mouse out node event.
     * @returns {undefined}
     */
    handleOnMouseOutNode = () => this.props.onMouseOut && this.props.onMouseOut(this.props.id);

    render() {
        const nodeProps = {
            cursor: this.props.cursor,
            onClick: this.handleOnClickNode,
            onContextMenu: this.handleOnRightClickNode,
            onMouseOut: this.handleOnMouseOutNode,
            onMouseOver: this.handleOnMouseOverNode,
            opacity: this.props.opacity,
        };

        let labelX = -15;
        let labelY = 2;
        let label = this.props.label;

        if (this.props.label.length < 9) {
            //can show one line
            labelX = -15 - (this.props.label.length - 7) * 2;
        } else if (this.props.label.length < 20) {
            labelX = -18;
            labelY = -2;
        }

        const textProps = {
            dx: labelX,
            dy: labelY,
            fill: this.props.fontColor,
            fontSize: this.props.fontSize,
            fontWeight: this.props.fontWeight,
            opacity: this.props.opacity,
        };

        const size = 1500;

        let gtx = this.props.cx,
            gty = this.props.cy,
            node = null,
            symbol = null;

        nodeProps.d = nodeHelper.buildSvgSymbol(size);
        nodeProps.fill = this.props.fill;
        nodeProps.stroke = this.props.selected ? this.props.selectedColor || "green" : "none";
        nodeProps.strokeWidth = this.props.selected ? 2 : this.props.strokeWidth;

        const textProps1 = Object.assign({}, textProps);
        textProps1.dy = 6;
        textProps1.dx = -15 - (this.props.label.length - 15) * 2;
        let label1 = null;

        if (label.length >= 9) {
            label1 = <text {...textProps1}>{this.props.label.slice(8, this.props.label.length - 1)}</text>;
        }

        label = <text {...textProps}>{label.length >= 9 ? label.slice(0, 8) : label}</text>;

        node = <path {...nodeProps} />;

        const symbolProps = {
            transform: `translate(${0},${17})`,
        };

        symbolProps.d = nodeHelper.buildSvgSymbol(5);
        symbolProps.fill = this.props.configured ? this.props.configuredColor || "green" : "transparent";
        symbol = <path {...symbolProps} />;

        const gProps = {
            className: this.props.className,
            cx: this.props.cx,
            cy: this.props.cy,
            id: this.props.id,
            transform: `translate(${gtx},${gty})`,
        };

        return (
            <g {...gProps}>
                {node}
                {symbol}
                {this.props.renderLabel && label}
                {label1}
            </g>
        );
    }
}
