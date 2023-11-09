import { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { ThemeContext } from "../../App";
import * as S from "./styles";

export function CreateCard({
  formFields,
  formSelectOptions,
  handleCreate,
  isEditMode,
}: any) {
  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (isEditMode) {
      Object.keys(isEditMode).forEach((key) => {
        setValue(key, isEditMode[key]);
      });
    }
  }, [isEditMode, setValue]);

  const onSubmit = async (formData: any) => {
    handleCreate(formData);
  };

  function ErrorMessage({ error }: { error?: any | undefined }) {
    return error ? <span>{error.message}</span> : null;
  }

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {formFields.fields.map((field: any) => (
          <S.FormGroup key={field.name}>
            <S.Label htmlFor={field.name}>{field.label}</S.Label>
            <S.Input type={field.type} {...register(field.name)} />
            <ErrorMessage error={errors[field.name]} />
          </S.FormGroup>
        ))}

        {formFields.checkboxes.map((checkbox: any) => (
          <S.CheckboxContainer key={checkbox.name}>
            <S.HiddenCheckbox
              {...register(checkbox.name)}
              id={checkbox.name}
              type="checkbox"
              checked={watch(checkbox.name)}
              onChange={() => {}}
            />

            <S.StyledCheckbox
              isChecked={!!watch(checkbox.name)}
              onClick={() => setValue(checkbox.name, !getValues(checkbox.name))}
            >
              <S.CheckboxIcon viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
              </S.CheckboxIcon>
            </S.StyledCheckbox>
            <S.Label htmlFor={checkbox.name}>{checkbox.label}</S.Label>
            <ErrorMessage error={errors[checkbox.name]} />
          </S.CheckboxContainer>
        ))}

        <S.FormGroup>
          <S.Label>Empresas</S.Label>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={formSelectOptions}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.name}
                isMulti
                classNamePrefix="select"
                placeholder="Selecione..."
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </S.FormGroup>

        <S.CreateButton type="submit" isActive={theme === "dark"}>
          {isEditMode ? formFields.button.saveText : formFields.button.text}
        </S.CreateButton>
      </S.Form>
    </S.Wrapper>
  );
}
