import { format } from "date-fns";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.avatar} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },

  {
    field: "branch",
    headerName: "Branch",
    width: 280,
    renderCell: (params) => {
      return <div>{params.row.branch.name}</div>;
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 280,
    renderCell: (params) => {
      return <div>{params.row.role.name}</div>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    renderCell: (params) => {
      return <div>{params.row.category.name}</div>;
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const discountColumns = [
  { field: "code", headerName: "Code", width: 170 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "percent",
    headerName: "Percent",
    width: 120,
  },
  {
    field: "startedAt",
    headerName: "From",
    width: 180,
    renderCell: (params) => {
      const date = new Date(params.row.startedAt);
      const afterFormat = format(date, "yyyy-MM-dd");
      return <div>{afterFormat}</div>;
    },
  },
  {
    field: "endedAt",
    headerName: "To",
    width: 180,
    renderCell: (params) => {
      const date = new Date(params.row.endedAt);
      const afterFormat = format(date, "yyyy-MM-dd");
      return <div>{afterFormat}</div>;
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
