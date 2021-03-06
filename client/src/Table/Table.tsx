import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Table.module.css";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { AuthContext } from "../context/AuthContext";
import { FiExternalLink } from "react-icons/all";
import { Link } from "react-router-dom";

export interface Data {
  aviary: number;
  birhYear: string;
  breedTypeId: number;
  cardId: string;
  id: number;
  nickName: string;
  petColorTypeId: number;
  petEarsTypeId: number;
  petHairTypeId: number;
  petTailTypeId: number;
  petTypeId: number;
  petsSizeId: number;
  sexTypeId: number;
  specialSigns: string;
  weight: number;
}

// const data = [
//   {
//     name: "Тузик1",
//     age: "10",
//     type: "C",
//     weight: "5",
//     color: "Белый",
//     number: "0",
//   },
//   {
//     name: "Тузик2",
//     age: "10",
//     type: "C",
//     weight: "5",
//     color: "Белый",
//     number: "1",
//   },
//   {
//     name: "Тузик3",
//     age: "10",
//     type: "C",
//     weight: "5",
//     color: "Белый",
//     number: "2",
//   },
//   {
//     name: "Тузик4",
//     age: "10",
//     type: "C",
//     weight: "5",
//     color: "Белый",
//     number: "3",
//   },
// ];

function createData(
  aviary: number,
  birhYear: string,
  breedTypeId: number,
  cardId: string,
  id: number,
  nickName: string,
  petColorTypeId: number,
  petEarsTypeId: number,
  petHairTypeId: number,
  petTailTypeId: number,
  petTypeId: number,
  petsSizeId: number,
  sexTypeId: number,
  specialSigns: string,
  weight: number
): Data {
  return {
    aviary,
    birhYear,
    breedTypeId,
    cardId,
    id,
    nickName,
    petColorTypeId,
    petEarsTypeId,
    petHairTypeId,
    petTailTypeId,
    petTypeId,
    petsSizeId,
    sexTypeId,
    specialSigns,
    weight,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "cardId",
    numeric: false,
    disablePadding: true,
    label: "Карточка учета животного №",
  },
  { id: "nickName", numeric: true, disablePadding: false, label: "Кличка" },
  {
    id: "petTypeId",
    numeric: false,
    disablePadding: false,
    label: "Вид",
  },
  {
    id: "birhYear",
    numeric: true,
    disablePadding: false,
    label: "Год рождения",
  },
  {
    id: "sexTypeId",
    numeric: false,
    disablePadding: false,
    label: "Пол",
  },
  { id: "weight", numeric: true, disablePadding: false, label: "Вес" },
  {
    id: "aviary",
    numeric: true,
    disablePadding: false,
    label: "Вольер, №",
  },
  {
    id: "breedTypeId",
    numeric: true,
    disablePadding: false,
    label: "Порода",
  },
  {
    id: "petColorTypeId",
    numeric: true,
    disablePadding: false,
    label: "Окрас",
  },
  {
    id: "petEarsTypeId",
    numeric: false,
    disablePadding: false,
    label: "Тип ушей",
  },
  {
    id: "petHairTypeId",
    numeric: false,
    disablePadding: false,
    label: "Тип шерсти",
  },
  {
    id: "petTailTypeId",
    numeric: false,
    disablePadding: false,
    label: "Тип хвоста",
  },
  {
    id: "petsSizeId",
    numeric: false,
    disablePadding: false,
    label: "Размер",
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Таблица питомцев
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

const convertName = (name: string) => {
  if (name) {
    return name[0].toUpperCase() + name.slice(1);
  } else {
    return "Без клички";
  }
};

export default function EnhancedTable(props: { data: Data[] }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("cardId");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState<Data[]>([]);

  const {
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

  useEffect(() => {
    const rowsTmp = props.data.map((d) =>
      createData(
        d.aviary,
        d.birhYear,
        d.breedTypeId,
        d.cardId,
        d.id,
        d.nickName,
        d.petColorTypeId,
        d.petEarsTypeId,
        d.petHairTypeId,
        d.petTailTypeId,
        d.petTypeId,
        d.petsSizeId,
        d.sexTypeId,
        d.specialSigns,
        d.weight
      )
    );

    setRows(rowsTmp);
  }, [props.data]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.cardId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.cardId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.cardId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.cardId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <div className={styles.linkcheckbox}>
                          {" "}
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                          <Link
                            to={`/pets/${row.id}`}
                            style={{
                              cursor: "pointer",
                              fontSize: "23px",
                              paddingTop: "7px",
                              marginRight: "10px",
                            }}
                          >
                            <FiExternalLink color="blue" />
                          </Link>
                        </div>
                      </TableCell>
                      {/* <TableCell
                        padding="checkbox"
                        style={{
                          cursor: "pointer",
                          fontSize: "22px",
                          paddingTop: "3px",
                        }}
                      >
                        <Link to={`/pets/${row.id}`}>
                          <FiExternalLink />
                        </Link>
                      </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.cardId}
                      </TableCell>
                      <TableCell align="right">{row.nickName}</TableCell>
                      <TableCell align="right">
                        {petTypeList[row.petTypeId - 1]?.type}
                      </TableCell>
                      <TableCell align="right">{row.birhYear}</TableCell>
                      <TableCell align="right">
                        {sexTypes[row.sexTypeId - 1]?.sex}
                      </TableCell>
                      <TableCell align="right">{row.weight}</TableCell>
                      <TableCell align="right">{row.aviary}</TableCell>
                      <TableCell align="right">
                        {breedList[row.breedTypeId - 1]?.breed}
                      </TableCell>
                      <TableCell align="right">
                        {petColorTypes[row.petColorTypeId - 1]?.color}
                      </TableCell>
                      <TableCell align="right">
                        {petEarsTypes[row.petEarsTypeId - 1]?.ears}
                      </TableCell>
                      <TableCell align="right">
                        {petHairTypes[row.petHairTypeId - 1]?.hair}
                      </TableCell>
                      <TableCell align="right">
                        {tailList[row.petTailTypeId - 1]?.tail}
                      </TableCell>
                      <TableCell align="right">
                        {petSizes[row.petsSizeId - 1]?.size}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Компактный вид"
      />
    </div>
  );
}
