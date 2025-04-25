import React from 'react'
import { ROUTE_DATATABLE_DATA, ROUTE_DATATABLE_EXPAND_DATA, ROUTE_FORMS_FORM_INPUTS, ROUTE_FORMS_INPUT_ELEMENTS, ROUTE_FORMS_INPUTS_MULTIPLE } from '@app/_moduleTest/config/catalogs/routesCatalog'
import { ComponentTypeEnum } from '@app/catalogs/enumCatalog'
import DataTableExpandModuleComponent from '@app/_moduleTest/components/datatableExpand/dataTableExpandModuleComponent'

const DataTableModuleComponent = React.lazy(() => import('@app/_moduleTest/components/datatable/dataTableModuleComponent'))
const InputElementModuleComponent = React.lazy(() => import('@app/_moduleTest/components/forms/formInputElementModule/inputElementModuleComponent'))
const FormInputsModuleComponent = React.lazy(() => import('@app/_moduleTest/components/forms/formInputsModule/formInputsModuleComponent'))
const FormInputsMultipleModuleComponent = React.lazy(() => import('@app/_moduleTest/components/forms/formInputsMultipleModule/formInputsMultipleModuleComponent'))

const routes = [
  { path: ROUTE_DATATABLE_DATA, name: 'Datatable Data', element: <DataTableModuleComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_DATATABLE_EXPAND_DATA, name: 'Datatable Expand Data', element: <DataTableExpandModuleComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_FORMS_INPUT_ELEMENTS, name: 'Input elements', element: <InputElementModuleComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_FORMS_FORM_INPUTS, name: 'Form inputs', element: <FormInputsModuleComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_FORMS_INPUTS_MULTIPLE, name: 'Form inputs', element: <FormInputsMultipleModuleComponent componentType={ComponentTypeEnum.MODULE} /> },
]

export default routes
