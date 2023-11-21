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
  const [selectedPatrimonyTag, setSelectedPatrimonyTag] = useState<any>("");
  const [patrimonies, setPatrimonies] = useState([]);
  const [isCustomPatrimony, setIsCustomPatrimony] = useState(false);
  const [customPatrimonyValue, setCustomPatrimonyValue] = useState("");

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

      formData.append(
        "equipmentTicketLocationId",
        JSON.stringify(
          selectedPatrimonyTag ? selectedPatrimonyTag.id : customPatrimonyValue
        )
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
  };

  const handleLocationChange = async (selectedOption: any) => {
    const locationId = selectedOption.id;

    try {
      const response = await apiClient().get(
        `/ticket/patrimony?locationId=${locationId}`
      );
      if (response.status === 200) {
        setPatrimonies(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar patrimônios:", error);
    }
  };

  const handleCustomPatrimonyChange = (e: any) => {
    setCustomPatrimonyValue(e.target.value);
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(handleSubmitTicket)}>
        <S.FormGroup>
          <S.Label htmlFor="ticket_type">Tipo de Chamado:*</S.Label>
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
          <S.Label htmlFor="ticket_category">Categoria:</S.Label>

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
                      // backgroundColor: "red", // later to configure a set cor theme.
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
                        theme === "dark" ? darkTheme.text : lightTheme.text,
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
          <S.Label htmlFor="ticket_priority">Prioridade:</S.Label>
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
          <S.Label htmlFor="ticket_location">Localização:</S.Label>
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
                    handleLocationChange(v);
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
            {selectedPatrimonyTag && !isCustomPatrimony && (
              <S.Tag>
                #{selectedPatrimonyTag.patrimonyTag}
                <S.RemoveTagButton onClick={handleRemoveTag}>
                  ×
                </S.RemoveTagButton>
              </S.Tag>
            )}
            {!isCustomPatrimony ? (
              <Select
                placeholder={"<Selecione>"}
                options={[
                  ...patrimonies,
                  { id: "custom", patrimonyTag: "Outro (inserir manualmente)" },
                ]} // adicionar uma opção para customizar
                value={selectedPatrimonyTag}
                getOptionLabel={(option) => `#${option.patrimonyTag}`}
                getOptionValue={(option) => option.id}
                onChange={(v) => {
                  if (v.id === "custom") {
                    setIsCustomPatrimony(true);
                    setSelectedPatrimonyTag(null);
                  } else {
                    setSelectedPatrimonyTag(v);
                  }
                }}
              />
            ) : (
              <S.Input
                type="text"
                placeholder="Insira o patrimônio"
                value={customPatrimonyValue}
                onChange={handleCustomPatrimonyChange}
              />
            )}
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
          <S.Label htmlFor="ticket_description">Descrição:</S.Label>
          <S.TextArea
            value={selectedDescription}
            className="basic-single"
            {...register("ticket_description")}
            onChange={(e) => setSelectedDescription(e.target.value)}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="ticket_images">Imagens:</S.Label>
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
