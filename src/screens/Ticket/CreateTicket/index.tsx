import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select, { components } from "react-select";
import { apiClient } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { ThemeContext } from "./../../../App";
import { createNewTicketSchema } from "../../../validations/createTicketSchema";
import { MdOutlineErrorOutline } from "react-icons/md";
import { toast } from "react-toastify";

import { darkTheme, lightTheme } from "../../../assets/styles/theme";
import * as S from "./styles";

interface ISelect {
  id: string;
  name: string;
  value: string;
}

export function CreateTicket({ tickets, setTickets }: any) {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(createNewTicketSchema),
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      ticket_type: "",
      ticket_category: "",
      ticket_priority: "",
      ticket_location: "",
      ticket_description: "",
      ticket_patrimonyTag: "",
      ticket_images: {},
    },
  });

  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [ticketType, setTicketType] = useState([]);
  const [ticketCategory, setTicketCategory] = useState([]);
  const [ticketPriority, setTicketPriority] = useState([]);
  const [ticketLocation, setTicketLocation] = useState([]);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedPatrimonyTag, setSelectedPatrimonyTag] = useState("");
  const [inputValue, setInputValue] = useState("");

  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const getTicketType = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId ||
      !user.currentLoggedCompany.currentLoggedCompanyName
    ) {
      return;
    }

    try {
      const { data } = await apiClient().get("/ticket-type", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });
      setTicketType(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    getTicketType();
  }, [user]);

  const getTicketCategory = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId ||
      !user.currentLoggedCompany.currentLoggedCompanyName
    ) {
      return;
    }

    try {
      const { data } = await apiClient().get("/ticket-category", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });

      setTicketCategory(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    getTicketCategory();
  }, [user]);

  const getTicketPriority = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId ||
      !user.currentLoggedCompany.currentLoggedCompanyName
    ) {
      return;
    }

    try {
      const { data } = await apiClient().get("/ticket-priority", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });

      setTicketPriority(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    getTicketPriority();
  }, [user]);

  const getTicketLocation = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId ||
      !user.currentLoggedCompany.currentLoggedCompanyName
    ) {
      return;
    }

    try {
      const { data } = await apiClient().get("/location", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });

      setTicketLocation(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    getTicketLocation();
  }, [user]);

  const Group = (props: any) => (
    <div style={groupStyles}>
      <components.Group {...props} />
    </div>
  );

  const groupStyles = {
    border: `2px solid ${
      theme === "dark" ? darkTheme.border : lightTheme.border
    }`,
    borderRadius: "5px",
    background: theme === "dark" ? darkTheme.bg2 : lightTheme.bg2,
    padding: "10px",
  };

  const handleSubmitTicket = async (values: any) => {
    try {
      const formData = new FormData();

      selectedImages.forEach((image) => {
        formData.append("ticket_images", image);
      });

      formData.append(
        "companyIds",
        JSON.stringify([user?.currentLoggedCompany.currentLoggedCompanyId])
      );
      formData.append("values", JSON.stringify(values));

      const { data } = await apiClient().post("/ticket", formData, {
        params: {
          userId: user?.userId,
        },
      });

      setTickets([...tickets, data.body]);

      toast.success("Sucesso! Seu ticket foi aberto! 🚀", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Limpa os campos após a submissão bem-sucedida
      setSelectedType(null);
      setSelectedCategory(null);
      setSelectedPriority(null);
      setSelectedLocation(null);
      setSelectedDescription("");
      setImagesPreview([]);
      setSelectedImages([]);
    } catch (err) {
      console.warn("err", err);
    }
  };

  const handleImageUpload = (e: any) => {
    const files = Array.from(e.target.files) as File[];
    const newPreviewImages = files.map((file) => URL.createObjectURL(file));
    setImagesPreview([...imagesPreview, ...newPreviewImages]);
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleImageDelete = (index: any) => {
    const newImagesPreview = [...imagesPreview];
    newImagesPreview.splice(index, 1);
    setImagesPreview(newImagesPreview);

    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  const handleRemoveTag = () => {
    setSelectedPatrimonyTag("");
    setInputValue("");
  };

  const handleInputBlur = (e: any) => {
    const value = e.target.value;
    createTag(value);
  };

  const createTag = (value: any) => {
    const formattedValue = value.trim().replace(/[, ]+$/, "");
    if (formattedValue) {
      setSelectedPatrimonyTag(formattedValue);
      setInputValue("");
    }
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(handleSubmitTicket)}>
        <S.FormGroup>
          <S.Label htmlFor="ticket_type" isActive={theme === "dark"}>
            Tipo de Chamado:*
          </S.Label>
          <Controller
            control={control}
            name="ticket_type"
            render={({ field: { onChange } }) => {
              return (
                <Select
                  placeholder={"<Selecione>"}
                  options={ticketType}
                  value={selectedType}
                  getOptionLabel={(option: ISelect) => option.name}
                  getOptionValue={(option: ISelect) => option.id}
                  onChange={(v: any) => {
                    onChange(v.id);
                    setSelectedType(v);
                  }}
                  required
                />
              );
            }}
          />
          <div>
            {!!errors.ticket_type && (
              <small
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  color: "red",
                }}
              >
                <MdOutlineErrorOutline
                  fill="red"
                  size={16}
                  style={{ marginRight: "3px" }}
                />
                {errors.ticket_type.message}
              </small>
            )}
          </div>
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_category" isActive={theme === "dark"}>
            Categoria:
          </S.Label>

          <Controller
            control={control}
            name="ticket_category"
            render={({ field: { onChange } }: any) => {
              return (
                <Select
                  placeholder={"<Selecione>"}
                  options={ticketCategory}
                  value={selectedCategory}
                  getOptionLabel={(option: ISelect) => option.value}
                  getOptionValue={(option: ISelect) => option.id}
                  components={{ Group }}
                  onChange={(v: any) => {
                    onChange(v.id);
                    setSelectedCategory(v);
                  }}
                  styles={{
                    groupHeading: (base) => ({
                      ...base,
                      flex: "1 1",
                      color:
                        theme === "dark" ? darkTheme.text : lightTheme.text,
                      margin: 0,
                      fontWeight: "bold",
                    }),
                    control: (base) => ({
                      ...base,
                      borderColor:
                        theme === "dark" ? darkTheme.border : lightTheme.border,
                      boxShadow: "none",
                      "&:hover": {
                        borderColor:
                          theme === "dark"
                            ? darkTheme.primary
                            : lightTheme.primary,
                      },
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color:
                        theme === "dark"
                          ? darkTheme.textSecondary
                          : lightTheme.textSecondary,
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color:
                        theme === "dark" ? darkTheme.text : lightTheme.text,
                    }),
                  }}
                  required
                />
              );
            }}
          />

          <div>
            {!!errors.ticket_category && (
              <small
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  color: "red",
                }}
              >
                <MdOutlineErrorOutline
                  fill="red"
                  size={16}
                  style={{ marginRight: "3px" }}
                />
                {errors.ticket_category.message}
              </small>
            )}
          </div>
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_priority" isActive={theme === "dark"}>
            Prioridade:
          </S.Label>
          <Controller
            control={control}
            name="ticket_priority"
            render={({ field: { onChange } }: any) => {
              return (
                <Select
                  placeholder={"<Selecione>"}
                  options={ticketPriority}
                  value={selectedPriority}
                  getOptionLabel={(option: ISelect) => option.name}
                  getOptionValue={(option: ISelect) => option.id}
                  onChange={(v: any) => {
                    onChange(v.id);
                    setSelectedPriority(v);
                  }}
                  required
                />
              );
            }}
          />
          {!!errors.ticket_priority && (
            <small
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                color: "red",
              }}
            >
              <MdOutlineErrorOutline
                fill="red"
                size={16}
                style={{ marginRight: "3px" }}
              />
              {errors.ticket_priority.message}
            </small>
          )}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_location" isActive={theme === "dark"}>
            Localização:
          </S.Label>
          <Controller
            control={control}
            name="ticket_location"
            render={({ field: { onChange } }: any) => {
              return (
                <Select
                  placeholder={"<Selecione>"}
                  options={ticketLocation}
                  value={selectedLocation}
                  getOptionLabel={(option: ISelect) => option.name}
                  getOptionValue={(option: ISelect) => option.id}
                  onChange={(v: any) => {
                    onChange(v.id);
                    setSelectedLocation(v);
                  }}
                  required
                />
              );
            }}
          />
          {!!errors.ticket_priority && (
            <small
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                color: "red",
              }}
            >
              <MdOutlineErrorOutline
                fill="red"
                size={16}
                style={{ marginRight: "3px" }}
              />
              {errors.ticket_priority.message}
            </small>
          )}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_patrimonyTag">Patrimônio:</S.Label>
          <S.TagInputContainer>
            {selectedPatrimonyTag && (
              <S.Tag>
                #{selectedPatrimonyTag}
                <S.RemoveTagButton onClick={handleRemoveTag}>
                  ×
                </S.RemoveTagButton>
              </S.Tag>
            )}
            <S.Input
              type="text"
              value={inputValue}
              placeholder="Número do patrimônio"
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleInputBlur}
              disabled={!!selectedPatrimonyTag}
              required
            />
          </S.TagInputContainer>
          {!!errors.ticket_patrimonyTag && (
            <small
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                color: "red",
              }}
            >
              <MdOutlineErrorOutline
                fill="red"
                size={16}
                style={{ marginRight: "3px" }}
              />
              {errors.ticket_patrimonyTag.message}
            </small>
          )}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_description" isActive={theme === "dark"}>
            Descrição:
          </S.Label>
          <S.TextArea
            value={selectedDescription}
            className="basic-single"
            {...register("ticket_description")}
            onChange={(e) => setSelectedDescription(e.target.value)}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="ticket_images" isActive={theme === "dark"}>
            Imagens:
          </S.Label>
          <S.FileInput>
            <S.Input
              type="file"
              id="ticket_images"
              multiple
              {...register("ticket_images")}
              onChange={(e) => handleImageUpload(e)}
              hidden
            />
            <S.FileLabel htmlFor="ticket_images">+</S.FileLabel>
          </S.FileInput>
          <S.PreviewContainer>
            {imagesPreview.map((src, index) => (
              <S.PreviewImageContainer key={index}>
                <S.PreviewImage src={src} />
                <S.DeleteIcon onClick={() => handleImageDelete(index)} />
              </S.PreviewImageContainer>
            ))}
          </S.PreviewContainer>
        </S.FormGroup>

        <S.CreateTicketButton type="submit" isActive={theme === "dark"}>
          Enviar
        </S.CreateTicketButton>
      </S.Form>
    </S.Wrapper>
  );
}
