import React, { ChangeEvent, useContext, useEffect, useState } from "react";
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
import { IBreed, IShelter } from "../Pets";
export interface ITail {
  id: number;
  tail: string;
}

export interface IPetType {
  id: number;
  type: string;
}
export interface IColor {
  id: number;
  petTypeId: number;
  color: "Черный ";
}

export interface IHair {
  id: number;
  petTypeId: number;
  hair: string;
}

export interface IEars {
  id: number;
  ears: string;
}

export interface ISizes {
  id: number;
  size: string;
}

export const AddDataPage = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    nickName: "",
    sexTypeId: "",
    petsSizeId: "",
    breedTypeId: "",
    // age: "",
    // description: "",
    // tail: "",
    // ears: "",
    // color: "",
    // wool: "",
  });

  const { request } = useHttp();

  const {
    token,
    data: {
      petColorTypes,
      petEarsTypes,
      petHairTypes,
      petSizes,
      petTypeList,
      shelterList,
      tailList,
      breedList,
      sexTypes,
    },
  } = useContext(AuthContext);

  const handleOnSexChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: React.ReactNode
  ) => {
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
        "/data/pet",
        "POST",
        {
          nickName: form.nickName,
          sexTypeId: form.sexTypeId,
          petsSizeId: form.petsSizeId,
          breedTypeId: form.breedTypeId,
          // age: form.age,
          // description: form.description,
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
            name="nickName"
            required
            onChange={changeHandler}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            className={styles.input}
            label="Возраст"
            onChange={changeHandler}
            name="age"
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
              name="sexTypeId"
              onChange={handleOnSexChange}
              value={form.sexTypeId}
            >
              {sexTypes.map((sex) => {
                return (
                  <MenuItem key={sex.id} value={sex.id}>
                    {sex.sex}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Размер
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="shelter"
              // onChange={handleOnSexChange}
            >
              {petSizes.map((size) => {
                return (
                  <MenuItem key={size.id} value={size.id}>
                    {size.size}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Приют
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="shelter"
              // onChange={handleOnSexChange}
            >
              {shelterList.map((shelter) => {
                return (
                  <MenuItem key={shelter.id} value={shelter.id}>
                    {shelter.shortName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Порода
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="shelter"
              // onChange={handleOnSexChange}
            >
              {breedList.map((breed) => {
                return (
                  <MenuItem key={breed.id} value={breed.id}>
                    {breed.breed}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Хвост
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="shelter"
              // onChange={handleOnSexChange}
            >
              {tailList.map((tail) => {
                return (
                  <MenuItem key={tail.id} value={tail.id}>
                    {tail.tail}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Вид
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="shelter"
              // onChange={handleOnSexChange}
            >
              {petTypeList.map((type) => {
                return (
                  <MenuItem key={type.id} value={type.id}>
                    {type.type}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Окрас
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="color"
              // onChange={handleOnSexChange}
            >
              {petColorTypes.map((color) => {
                return (
                  <MenuItem key={color.id} value={color.id}>
                    {color.color}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Тип шерсти
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="color"
              // onChange={handleOnSexChange}
            >
              {petHairTypes.map((hair) => {
                return (
                  <MenuItem key={hair.id} value={hair.id}>
                    {hair.hair}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.inputContainer}>
          <FormControl className={styles.dropdown}>
            <InputLabel id="demo-simple-select-outlined-label" required>
              Тип ушей
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Age"
              required
              name="shelter"
              // onChange={handleOnSexChange}
            >
              {petEarsTypes.map((ears) => {
                return (
                  <MenuItem key={ears.id} value={ears.id}>
                    {ears.ears}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={styles.textAreaContainer}>
          <TextareaAutosize
            name="description"
            onChange={changeHandler}
            rowsMin={10}
            rowsMax={10}
            placeholder="Введите описание"
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            onClick={addHandler}
          >
            <span>Сохранить</span>
            <AiOutlineArrowRight className={styles.arrow_icon} />
          </Button>
        </div>
      </form>

      <div className={styles.mobileFunctions}>
        <div>
          <AiFillCamera />
        </div>
        <div className={styles.nfc}>
          <SiNfc />
        </div>
      </div>
    </div>
  );
};
