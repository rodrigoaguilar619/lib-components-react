
/**
 * Generates a data table configuration object based on the provided parameters.
 *
 * @param {number | null} currentPage - The current page number.
 * @param {number | null} rowsPerPage - The number of rows per page.
 * @param {Record<string, any>} filters - The filters to be applied to the data table.
 * @return {Object} The data table configuration object.
 */
export function buildDataTableConfig(currentPage: number | null, rowsPerPage: number | null, filters: Record<string, any>) {
    return {
        dataTableConfig: {
            currentPage: currentPage,
            rowsPerPage: rowsPerPage,
            filters: filters
        }
    }
}