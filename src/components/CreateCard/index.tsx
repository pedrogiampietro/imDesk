import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { ThemeContext } from "../../App";
import { toast } from "react-toastify";
import * as S from "./styles";

export function CreateCard({ formFields, formSelectOptions }: any) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(newUserSchema),
  });
  const { theme } = useContext(ThemeContext);

  const onSubmit = async (formData: any) => {
    console.log(formData);
    toast.success("Usuário criado com sucesso!");
    // Implementação após o usuário ser criado
  };

  console.log("formFields", formFields);

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        {formFields.fields.map((field: any) => (
          <S.FormGroup key={field.name}>
            <S.Label htmlFor={field.name}>{field.label}</S.Label>
            <S.Input type={field.type} {...register(field.name)} />
            {errors[field.name] && <span>{errors[field.name].message}</span>}
          </S.FormGroup>
        ))}

        {formFields.checkboxes.map((checkbox: any) => (
          <S.FormGroup key={checkbox.name}>
            <S.Label htmlFor={checkbox.name}>
              <S.Input
                type="checkbox"
                {...register(checkbox.name)}
                id={checkbox.name}
              />
              {checkbox.label}
            </S.Label>
            {errors[checkbox.name] && (
              <span>{errors[checkbox.name].message}</span>
            )}
          </S.FormGroup>
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
          {/* {errors[select.name] && <span>{errors[select.name].message}</span>} */}
        </S.FormGroup>

        <S.CreateButton type="submit" isActive={theme === "dark"}>
          {formFields.button.text}
        </S.CreateButton>
      </S.Form>
    </S.Wrapper>
  );
}
