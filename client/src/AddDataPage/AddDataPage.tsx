import React, { ChangeEvent, useContext, useState } from "react";
import Button from "@material-ui/core/Button/Button";
import {
  TextField,
  Select,
  TextareaAutosize,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core/";
import { AiOutlineArrowRight, AiFillCamera } from "react-icons/ai";
import { SiNfc } from "react-icons/all";
import styles from "./AddDataPage.module.css";
import { useAuth } from "../hooks/auth.hook";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const AddDataPage = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    name: "",
    sex: "",
    type: "",
    breed: "",
    age: "",
    description: "",
  });

  const { token } = useContext(AuthContext);

  const { request } = useHttp();

  const handleOnSexChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => {
    debugger;
    setForm({
      ...form,
      [event.target.name as string]: event.target.value,
    });
  };

  const changeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const addHandler = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      const data = await request(
        "/api/admin/pets/add",
        "POST",
        {
          name: form.name,
          sex: form.sex,
          type: form.type,
          breed: form.breed,
          age: form.age,
          description: form.description,
        },
        { Authorization: `Bearer ${token}` }
      );
      console.log(form);
      history.push(`/pets`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Добавить карточку учета животного</h3>
      <form>
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            label="Кличка"
            name="name"
            required
            onChange={changeHandler}
          />
        </div>
        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Пол
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="sex"
              onChange={handleOnSexChange}
              value={form.sex}
            >
              <MenuItem value="">
                <em>Не выбрано</em>
              </MenuItem>
              <MenuItem value={"М"}>М</MenuItem>
              <MenuItem value={"Ж"}>Ж</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            label="Вид"
            required
            onChange={changeHandler}
            name="type"
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            label="Порода"
            onChange={changeHandler}
            name="breed"
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            label="Возраст"
            onChange={changeHandler}
            name="age"
          />
          <TextField
            className={styles.input}
            label="Окрас"
            onChange={changeHandler}
            name="color"
          />
          <TextField
            className={styles.input}
            label="Шерсть"
            onChange={changeHandler}
            name="wool"
          />
          <TextField
            className={styles.input}
            label="Уши"
            onChange={changeHandler}
            name="ears"
          />
          <TextField
            className={styles.input}
            label="Хвост"
            onChange={changeHandler}
            name="tail"
          />
        </div>
        {/* {/* <div className={styles.textAreaContainer}>
          <TextareaAutosize
            name="description"
            onChange={changeHandler}
            rowsMin={10}
            rowsMax={10}
            placeholder="Введите описание"
          />
        </div> */}
      </form>
      {/* <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={addHandler}
        >
          <span>Сохранить</span>
          <AiOutlineArrowRight className={styles.arrow_icon} />
        </Button>
      </div> */}
      {/* <div className={styles.mobileFunctions}>
        <div>
          <AiFillCamera />
        </div>
        <div className={styles.nfc}>
          <SiNfc />
        </div>
      </div> */}
    </div>
  );
};
