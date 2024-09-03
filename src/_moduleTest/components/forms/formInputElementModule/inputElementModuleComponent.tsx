import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTemplateHeaderSubTitleAction } from '@app/controller/actions/templateHeaderAction';
import { Col, Container, Row } from 'react-bootstrap';
import InputElementComponent from '@app/components/forms/formInputElementComponent';
import { InputElementEnum, InputMaskEnum } from '@app/catalogs/enumCatalog';
import { formatJsonWithBoldKeys } from '@app/utils/formatUtils/formatJsonUtil';
import { FormInputElementModulePropsI } from '@app/_moduleTest/_propTypes/components/forms/inputElementModule';

const FormInputElementModuleComponent: React.FC<FormInputElementModulePropsI> = () => {

  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const [valueMaskNumber, setValueMaskNumber] = useState<string>('');
  const [valueMaskPhone, setValueMaskPhone] = useState<string>('');
  const [valueSelect, setValueSelect] = useState<string>('');
  const [dateMillis, setDateMillis] = useState<number | null | undefined>(null);
  const [dateMillisFormat, setDateMillisFormat] = useState<number | null | undefined>(null);
  const [valueFile, setValueFile] = useState<File | null | undefined>(null);

    const cities: { description: string; id: string }[] = [
        { description: 'New York', id: 'NY' },
        { description: 'Rome', id: 'RM' },
        { description: 'London', id: 'LDN' },
        { description: 'Istanbul', id: 'IST' },
        { description: 'Paris', id: 'PRS' }
    ];

  useEffect(() => {
    dispatch(setTemplateHeaderSubTitleAction("Input elements"));

    return () => {
    };
  }, []);

  return (<div>
    <Container>
      <Row>
        <Col md={"auto"} style={{width: "33%"}}>
          Text:
          <InputElementComponent inputProps={{inputType: InputElementEnum.TEXT, id: 'text', value: value}} updateValue={setValue} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Mask Numeric:
          <InputElementComponent inputProps={{inputType: InputElementEnum.MASK, id: 'maskNumeric', value: valueMaskNumber, maskType: InputMaskEnum.NUMBER, maskProps: {totalDecimals: 2}}} updateValue={setValueMaskNumber} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Mask Phone:
          <InputElementComponent inputProps={{inputType: InputElementEnum.MASK, id: 'maskPhone', value: valueMaskPhone, maskType: InputMaskEnum.PHONE}} updateValue={setValueMaskPhone} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Dropdown:
          <InputElementComponent inputProps={{inputType: InputElementEnum.SELECT, id: 'select', value: valueSelect,
            options: cities}} updateValue={setValueSelect} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Datepicker default format:
          <InputElementComponent inputProps={{inputType: InputElementEnum.CALENDAR, id: 'date', value: dateMillis}} updateValue={setDateMillis} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Datepicker format yy/mm/dd:
          <InputElementComponent inputProps={{inputType: InputElementEnum.CALENDAR, id: 'dateFormat', dateFormat: "yy/mm/dd", value: dateMillisFormat}} updateValue={setDateMillisFormat} />
        </Col>
        { <Col md={"auto"} style={{width: "33%"}}>
          File upload:
          <InputElementComponent inputProps={{inputType: InputElementEnum.FILE, id: 'file', value: valueFile}} updateValue={setValueFile} />
        </Col> }
      </Row>
    </Container>
    <br></br>
    {formatJsonWithBoldKeys("Inputs", { text: value, mask: valueMaskNumber, phone: valueMaskPhone, select: valueSelect,
      date: dateMillis, dateFormat: dateMillisFormat, file: valueFile })}
  </div>
  );
}

export default FormInputElementModuleComponent