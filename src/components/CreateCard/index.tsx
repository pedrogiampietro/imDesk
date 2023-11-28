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
  isMultiCompany,
}: any) {
  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (isEditMode) {
      Object.keys(isEditMode).forEach((key) => {
        let value = isEditMode[key];

        // Transforma valores para campos 'select'
        if ((key === "category" || key === "status") && value) {
          // Encontre a opção correspondente no array de opções
          const option = formFields.fields
            .find((field: any) => field.name === key)
            .options.find((option: any) => option === value);
          value = { label: option, value: option };
        }

        if (key === "resolvedAt" && value) {
          const date = new Date(value);
          const formattedDate = date.toISOString().split("T")[0];
          value = formattedDate;
        }

        setValue(key, value);
      });
    }
  }, [isEditMode, setValue, formFields.fields]);

  const onSubmit = async (formData: any) => {
    handleCreate(formData);
  };

  function ErrorMessage({ error }: { error?: any | undefined }) {
    return error ? <span>{error.message}</span> : null;
  }

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {formFields?.fields?.map((formField: any) => {
          if (!isEditMode && formField.visible === false) {
            return null;
          }

          if (formField.type === "select") {
            return (
              <S.FormGroup key={formField.name}>
                <S.Label htmlFor={formField.name}>{formField.label}</S.Label>
                <Controller
                  name={formField.name}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={formField?.options?.map((option: any) => ({
                        value: option,
                        label: option,
                      }))}
                      classNamePrefix="select"
                      placeholder="Selecione..."
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
                <ErrorMessage error={errors[formField.name]} />
              </S.FormGroup>
            );
          } else if (formField.type === "textarea") {
            return (
              <S.FormGroup key={formField.name}>
                <S.Label htmlFor={formField.name}>{formField.label}</S.Label>
                <S.TextArea {...register(formField.name)} />
                <ErrorMessage error={errors[formField.name]} />
              </S.FormGroup>
            );
          } else {
            return (
              <S.FormGroup key={formField.name}>
                <S.Label htmlFor={formField.name}>{formField.label}</S.Label>
                <S.Input type={formField.type} {...register(formField.name)} />
                <ErrorMessage error={errors[formField.name]} />
              </S.FormGroup>
            );
          }
        })}

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
                isMulti={isMultiCompany}
                classNamePrefix="select"
                placeholder="Selecione..."
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
        </S.FormGroup>

        <S.CreateButton
          type="submit"
          disabled={isSubmitting}
          isActive={theme === "dark"}
        >
          {isEditMode ? formFields.button.saveText : formFields.button.text}
        </S.CreateButton>
      </S.Form>
    </S.Wrapper>
  );
}
