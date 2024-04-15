import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTemplateHeaderSubTitleAction } from '@app/controller/actions/templateHeaderAction';
import { Col, Container, Row } from 'react-bootstrap';
import InputElementComponent from '@app/components/forms/inputElements/inputElementComponent';
import { InputElementEnum, InputMaskEnum } from '@app/catalogs/enumCatalog';
import { formatJsonWithBoldKeys } from '@app/utils/formatUtils/formatJsonUtil';
import { InputElementModulePropsI } from '@app/_moduleTest/_propTypes/components/forms/inputElementModule';

const InputElementModuleComponent: React.FC<InputElementModulePropsI> = () => {

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
          <InputElementComponent inputProps={{inputType: InputElementEnum.TEXT, value: value, updateValue: setValue}} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Mask Numeric:
          <InputElementComponent inputProps={{inputType: InputElementEnum.MASK, value: valueMaskNumber, updateValue: setValueMaskNumber, maskType: InputMaskEnum.NUMBER, maskProps: {totalDecimals: 2}}} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Mask Phone:
          <InputElementComponent inputProps={{inputType: InputElementEnum.MASK, value: valueMaskPhone, updateValue: setValueMaskPhone, maskType: InputMaskEnum.PHONE}} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Dropdown:
          <InputElementComponent inputProps={{inputType: InputElementEnum.SELECT, value: valueSelect, updateValue: setValueSelect,
            options: cities}} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Datepicker default format:
          <InputElementComponent inputProps={{inputType: InputElementEnum.CALENDAR, value: dateMillis, updateValue: setDateMillis}} />
        </Col>
        <Col md={"auto"} style={{width: "33%"}}>
          Datepicker format yy/mm/dd:
          <InputElementComponent inputProps={{inputType: InputElementEnum.CALENDAR, dateFormat: "yy/mm/dd", value: dateMillisFormat, updateValue: setDateMillisFormat}} />
        </Col>
        { <Col md={"auto"} style={{width: "33%"}}>
          File upload:
          <InputElementComponent inputProps={{inputType: InputElementEnum.FILE, updateValue: setValueFile, value: valueFile}} />
        </Col> }
      </Row>
    </Container>
    <br></br>
    {formatJsonWithBoldKeys("Inputs", { text: value, mask: valueMaskNumber, phone: valueMaskPhone, select: valueSelect,
      date: dateMillis, dateFormat: dateMillisFormat, file: valueFile })}
  </div>
  );
}

export default InputElementModuleComponent