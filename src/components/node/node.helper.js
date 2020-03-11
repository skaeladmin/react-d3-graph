/**
 * @module Node/helper
 * @description
 * Some methods that help no the process of rendering a node.
 */
import {
    symbolCircle as d3SymbolCircle,
    symbolCross as d3SymbolCross,
    symbolDiamond as d3SymbolDiamond,
    symbolSquare as d3SymbolSquare,
    symbolStar as d3SymbolStar,
    symbolTriangle as d3SymbolTriangle,
    symbolWye as d3SymbolWye,
    symbol as d3Symbol,
} from "d3-shape";

import CONST from "./node.const";

/**
 * Converts a string that specifies a symbol into a concrete instance
 * of d3 symbol.<br/>
 * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol}
 * @param  {string} typeName - the string that specifies the symbol type (should be one of {@link #node-symbol-type|node.symbolType}).
 * @returns {Object} concrete instance of d3 symbol (defaults to circle).
 * @memberof Node/helper
 */
function _convertTypeToD3Symbol() {
    return d3SymbolCircle;
}

/**
 * Build a d3 svg symbol based on passed symbol and symbol type.
 * @param  {number} [size=80] - the size of the symbol.
 * @param  {string} [symbolTypeDesc='circle'] - the string containing the type of symbol that we want to build
 * (should be one of {@link #node-symbol-type|node.symbolType}).
 * @returns {Object} concrete instance of d3 symbol.
 * @memberof Node/helper
 */
function buildSvgSymbol(size = CONST.DEFAULT_NODE_SIZE, selected = false, configured = false) {
    return d3Symbol()
        .size(() => size)
        .type(() => _convertTypeToD3Symbol())();
}

export default {
    buildSvgSymbol,
};
