// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Typography,
//   Box,
//   Stack,
//   TextField,
//   Button,
//   IconButton,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
//   CircularProgress,
// } from "@mui/material";
// import { Close as CloseIcon } from "@mui/icons-material";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import toast from "react-hot-toast";
// import { schema } from "./schema";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   getDetailsUser,
//   updateUser,
//   CreateUser,
// } from "../../services/user.api";
// import { useParams, useNavigate } from "react-router";
// import { uploadFile } from "../../services/upload.api";

// const FormUsers = ({ mode }) => {
//   const queryClient = useQueryClient();
//   const params = useParams();
//   const navigate = useNavigate();
//   const [image, setImage] = useState("");
//   const [vehicle, setVehicle] = useState();
//   const [avatarUploaded, setAvatarUploaded] = useState(false);
//   const [vehicleImages, setVehicleImages] = useState([]);

//   const id = params.id;

//   const transformData = (data) => {
//     return {
//       firstname: data.firstname,
//       phone: data.phone,
//       email: data.email,
//       vehicles: data.vehicles || [
//         { vehicle_name: "", vehicle_type: "", license_plate: "", image: "" },
//       ],
//       avatar: data.avatar,
//     };
//   };

//   const { data: users } = useQuery(
//     ["DETAIL_USER", id],
//     () => getDetailsUser(id),
//     {
//       enabled: !!id,
//     }
//   );

//   const {
//     getValues,
//     setValue,
//     handleSubmit,
//     reset,
//     register,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     mode: "onChange",
//     context: { mode },
//     defaultValues: {
//       firstname: "",
//       email: "",
//       phone: "",
//     },
//   });

//   useEffect(() => {
//     if (mode !== "add" && users && users?.data) {
//       const transformedData = transformData(users?.data);
//       reset(transformedData);
//       setImage(transformedData.avatar);
//     }
//   }, [mode, users, setValue]);

//   const { mutate: mutateCreateUser, isLoading } = useMutation(
//     (data) => (mode === "add" ? CreateUser(data) : updateUser(id, data)),
//     {
//       onSuccess: async () => {
//         await queryClient.invalidateQueries(["USERS"]);
//         reset();
//         navigate("/admin/users", { replace: true });
//         toast.success("Thành công");
//       },
//     }
//   );

//   const onSubmit = (data) => {
//     mutateCreateUser(data);
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };

//   const handleFileChange = async (e) => {
//     const files = Array.from(e.target.files);
//     try {
//       const data = await uploadFile(files);

//       if (data.statusCode === 200) {
//         const avatarUrl = data.data.uploadedFiles[0].url || "";
//         setImage(avatarUrl);
//         setValue("avatar", avatarUrl);
//         setAvatarUploaded(true);
//       } else {
//         throw new Error(data.message || "Có lỗi xảy ra.");
//       }
//     } catch (error) {
//       console.error("Upload thất bại:", error);
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//     setAvatarUploaded(false);
//     setValue("avatar", "");
//   };

//   const handleFileChangeVehicle = async (index, e) => {
//     const files = Array.from(e.target.files);
//     try {
//       const data = await uploadFile(files);

//       if (data.statusCode === 200) {
//         const imageUrl = data.data.uploadedFiles[0].url || "";
//         const updatedVehicleImages = [...vehicleImages];
//         updatedVehicleImages[index] = imageUrl;
//         setVehicleImages(updatedVehicleImages);
//         setValue(`vehicles.${index}.image`, imageUrl);
//       } else {
//         throw new Error(data.message || "Có lỗi xảy ra.");
//       }
//     } catch (error) {
//       toast.error("Lỗi khi tải ảnh phương tiện lên!");
//       console.error("Upload thất bại:", error);
//     }
//   };

//   const handleRemoveVehicleImage = (index) => {
//     const updatedVehicleImages = [...vehicleImages];
//     updatedVehicleImages[index] = "";
//     setVehicleImages(updatedVehicleImages);
//     setValue(`vehicles.${index}.image`, "");
//   };

//   const handleVehicleChange = async (e) => {
//     const files = Array.from(e.target.files);
//     try {
//       const data = await uploadFile(files);

//       if (data.statusCode === 200) {
//         const vehicleUrl = data.data.uploadedFiles[0].url || "";
//         setVehicle(vehicleUrl);
//         setValue(`vehicles.[0].image`, vehicleUrl);
//       } else {
//         throw new Error(data.message || "Có lỗi xảy ra.");
//       }
//     } catch (error) {
//       console.error("Upload thất bại:", error);
//     }
//   };

//   const handleRemoveVehicle = () => {
//     setVehicle(null);
//     setValue(`vehicles.image`, "");
//   };

//   return (
//     <Box padding={3}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//       >
//         <Typography variant="h5" fontWeight="bold" fontSize="1.5rem">
//           {mode === "add" ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
//         </Typography>
//         <Stack direction="row" spacing={2}>
//           <Button
//             variant="contained"
//             type="submit"
//             onClick={handleSubmit(onSubmit)}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <CircularProgress size={20} />
//             ) : mode === "add" ? (
//               "Tạo"
//             ) : (
//               "Lưu"
//             )}
//           </Button>
//           <Button
//             variant="contained"
//             color="error"
//             onClick={handleCancel}
//             disabled={isLoading}
//           >
//             Hủy
//           </Button>
//         </Stack>
//       </Box>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Box bgcolor="#ffffff" borderRadius={2} boxShadow={2} p={2}>
//             <TextField
//               id="outlined-basic"
//               label="Họ và tên"
//               variant="outlined"
//               fullWidth
//               sx={{ mb: 2 }}
//               onChange={(e) =>
//                 setValue("firstname", e.target.value, {
//                   shouldValidate: true,
//                 })
//               }
//               value={getValues("firstname")}
//               error={!!errors.firstname}
//               helperText={errors.firstname?.message}
//             />
//             <TextField
//               id="outlined-basic"
//               label="Số điện thoại"
//               variant="outlined"
//               fullWidth
//               onChange={(e) =>
//                 setValue("phone", e.target.value, {
//                   shouldValidate: true,
//                 })
//               }
//               value={getValues("phone")}
//               error={!!errors.phone}
//               helperText={errors.phone?.message}
//             />
//             {mode === "add" && (
//               <TextField
//                 id="outlined-basic"
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 onChange={(e) =>
//                   setValue("email", e.target.value, {
//                     shouldValidate: mode === "add",
//                   })
//                 }
//                 value={getValues("email")}
//                 error={mode === "add" && !!errors.email}
//                 helperText={mode === "add" ? errors.email?.message : ""}
//                 sx={{ mt: 2 }}
//               />
//             )}
//             {mode === "add" && (
//               <TextField
//                 id="outlined-basic"
//                 label="Mật khẩu"
//                 variant="outlined"
//                 fullWidth
//                 onChange={(e) =>
//                   setValue("password", e.target.value, {
//                     shouldValidate: mode === "add",
//                   })
//                 }
//                 value={getValues("password")}
//                 error={mode === "add" && !!errors.password}
//                 helperText={mode === "add" ? errors.password?.message : ""}
//                 sx={{ mb: 2, mt: 2 }}
//               />
//             )}
//           </Box>
//           {/* thêm phương tiện */}
//           {mode === "edit" && (
//             <Box mt={4}>
//               {getValues("vehicles")?.map((vehicle, index) => (
//                 <Box
//                   key={index}
//                   mb={2}
//                   bgcolor="#ffffff"
//                   borderRadius={2}
//                   boxShadow={2}
//                   p={2}
//                   sx={{ position: "relative" }}
//                 >
//                   <Typography variant="h4" gutterBottom>
//                     Phương tiện {index + 1}:
//                   </Typography>

//                   <Controller
//                     name={`vehicles[${index}].vehicle_name`}
//                     control={control}
//                     defaultValue={vehicle.vehicle_name}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         id={`vehicles[${index}].vehicle_name`}
//                         label="Tên phương tiện"
//                         variant="outlined"
//                         fullWidth
//                         sx={{ mb: 2 }}
//                         error={!!errors?.vehicles?.[index]?.vehicle_name}
//                         helperText={
//                           errors?.vehicles?.[index]?.vehicle_name?.message
//                         }
//                       />
//                     )}
//                   />

//                   <Controller
//                     name={`vehicles[${index}].vehicle_type`}
//                     control={control}
//                     defaultValue={vehicle.vehicle_type}
//                     render={({ field }) => (
//                       <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
//                         <InputLabel id={`vehicle-type-label-${index}`}>
//                           Loại phương tiện
//                         </InputLabel>
//                         <Select
//                           {...field}
//                           labelId={`vehicle-type-label-${index}`}
//                           id={`vehicle-type-${index}`}
//                           label="Loại phương tiện"
//                           error={!!errors?.vehicles?.[index]?.vehicle_type}
//                           helperText={
//                             errors?.vehicles?.[index]?.vehicle_type?.message
//                           }
//                         >
//                           <MenuItem value="4 chỗ">4 chỗ</MenuItem>
//                           <MenuItem value="7 chỗ">7 chỗ</MenuItem>
//                           <MenuItem value="9 chỗ">9 chỗ</MenuItem>
//                         </Select>
//                       </FormControl>
//                     )}
//                   />

//                   <Controller
//                     name={`vehicles[${index}].license_plate`}
//                     control={control}
//                     defaultValue={vehicle.license_plate}
//                     render={({ field }) => (
//                       <TextField
//                         {...field}
//                         id={`license-plate-${index}`}
//                         label="Biển số phương tiện"
//                         variant="outlined"
//                         fullWidth
//                         sx={{ mb: 2 }}
//                         error={!!errors?.vehicles?.[index]?.license_plate}
//                         helperText={
//                           errors?.vehicles?.[index]?.license_plate?.message
//                         }
//                       />
//                     )}
//                   />

//                   {vehicle.image && (
//                     <Box
//                       position="relative"
//                       width={120}
//                       height={120}
//                       sx={{ mb: 2 }}
//                     >
//                       <img
//                         src={vehicle.image}
//                         alt={vehicle.vehicle_name}
//                         width={120}
//                         height={120}
//                         style={{ marginBottom: 16, objectFit: "cover" }}
//                       />
//                       <IconButton
//                         onClick={() => handleRemoveVehicleImage(index)}
//                         sx={{
//                           position: "absolute",
//                           top: -10,
//                           right: -10,
//                           color: "red",
//                           bgcolor: "white",
//                           borderRadius: "50%",
//                           padding: "4px",
//                           boxShadow: 2,
//                         }}
//                       >
//                         <CloseIcon sx={{ height: 16, width: 16 }} />
//                       </IconButton>
//                     </Box>
//                   )}
//                   {errors?.vehicles?.[index]?.image && (
//                     <Typography variant="body2" color="error">
//                       {errors?.vehicles?.[index]?.image?.message}
//                     </Typography>
//                   )}
//                   {/* Upload Image Button */}
//                   <Box display="flex" alignItems="center">
//                     <input
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       id={`contained-button-file-${index}`}
//                       multiple
//                       type="file"
//                       {...register(`vehicles[${index}].image`)}
//                       onChange={(e) => handleFileChangeVehicle(index, e)}
//                     />
//                     <label htmlFor={`contained-button-file-${index}`}>
//                       <Button
//                         variant="contained"
//                         component="span"
//                         disabled={isLoading}
//                       >
//                         Tải ảnh lên
//                       </Button>
//                     </label>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           )}

//           {mode === "add" && (
//             <Box
//               mb={2}
//               bgcolor="#ffffff"
//               borderRadius={2}
//               boxShadow={2}
//               p={2}
//               mt={4}
//               sx={{ position: "relative" }}
//             >
//               <Typography variant="h4" gutterBottom>
//                 Phương tiện :
//               </Typography>

//               <TextField
//                 label="Tên phương tiện"
//                 variant="outlined"
//                 fullWidth
//                 sx={{ mb: 2 }}
//                 onChange={(e) =>
//                   setValue(`vehicles.[0].vehicle_name`, e.target.value, {
//                     shouldValidate: true,
//                   })
//                 }
//                 {...register(`vehicles.[0].vehicle_name`)}
//                 error={!!errors.vehicles?.[0].license_plate}
//                 helperText={errors.vehicles?.[0].license_plate?.message}
//               />

//               <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
//                 <InputLabel id="vehicle-type-label">
//                   Loại phương tiện
//                 </InputLabel>
//                 <Select
//                   labelId="vehicle-type-label"
//                   id="vehicle-type"
//                   label="Loại phương tiện"
//                   onChange={(e) =>
//                     setValue(
//                       "vehicles.[0].vehicle_type",
//                       e.target.value || "",
//                       {
//                         shouldValidate: true,
//                       }
//                     )
//                   }
//                   {...register(`vehicles.[0].vehicle_type`)}
//                   error={!!errors.vehicles?.[0].vehicle_type}
//                   helperText={errors.vehicles?.[0].vehicle_type?.message}
//                 >
//                   <MenuItem value="4 chỗ">4 chỗ</MenuItem>
//                   <MenuItem value="7 chỗ">7 chỗ</MenuItem>
//                   <MenuItem value="9 chỗ">9 chỗ</MenuItem>
//                 </Select>
//                 <Typography variant="caption" color="error" ml={2}>
//                   {errors.vehicles?.[0].vehicle_type?.message}
//                 </Typography>
//               </FormControl>

//               <TextField
//                 label="Biển số phương tiện"
//                 variant="outlined"
//                 fullWidth
//                 sx={{ mb: 2 }}
//                 onChange={(e) =>
//                   setValue(`vehicles.[0].license_plate`, e.target.value, {
//                     shouldValidate: true,
//                   })
//                 }
//                 {...register(`vehicles.[0].license_plate`)}
//                 error={!!errors.vehicles?.[0].license_plate}
//                 helperText={errors.vehicles?.[0].license_plate?.message}
//               />

//               {vehicle && (
//                 <Box
//                   position="relative"
//                   width={120}
//                   height={120}
//                   sx={{ mb: 2 }}
//                 >
//                   <img
//                     src={vehicle}
//                     alt="vehicle"
//                     width={120}
//                     height={120}
//                     style={{ marginBottom: 16, objectFit: "cover" }}
//                   />
//                   <IconButton
//                     onClick={handleRemoveVehicle}
//                     sx={{
//                       position: "absolute",
//                       top: -10,
//                       right: -10,
//                       color: "red",
//                       bgcolor: "white",
//                       borderRadius: "50%",
//                       padding: "4px",
//                       boxShadow: 2,
//                     }}
//                   >
//                     <CloseIcon sx={{ height: 16, width: 16 }} />
//                   </IconButton>
//                 </Box>
//               )}
//               {errors.vehicles?.[0].image && (
//                 <Typography variant="body2" color="error" ml={2}>
//                   {errors.vehicles?.[0].image.message}
//                 </Typography>
//               )}

//               <Box display="flex" alignItems="center">
//                 <input
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   id="contained-button"
//                   multiple
//                   type="file"
//                   {...register("vehicles.[0].image")}
//                   onChange={handleVehicleChange}
//                 />
//                 <label htmlFor="contained-button">
//                   <Button
//                     variant="contained"
//                     component="span"
//                     disabled={isLoading}
//                   >
//                     Tải ảnh lên
//                   </Button>
//                 </label>
//               </Box>
//             </Box>
//           )}
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Box justifyContent="space-between" height="100%">
//             <Box bgcolor="#ffffff" borderRadius={2} boxShadow={2} p={2} mb={2}>
//               <Box justifyContent="center" mb={2}>
//                 <input
//                   accept="image/*"
//                   style={{ display: "none" }}
//                   id="contained-button-file"
//                   multiple
//                   type="file"
//                   onChange={handleFileChange}
//                 />
//                 <Box display="flex" alignItems="center">
//                   <Typography
//                     fontWeight={700}
//                     fontSize={18}
//                     variant="body1"
//                     sx={{ mr: 2 }}
//                   >
//                     Ảnh đại diện:
//                   </Typography>
//                   <label htmlFor="contained-button-file">
//                     <Button
//                       variant="contained"
//                       component="span"
//                       disabled={avatarUploaded || isLoading}
//                       sx={{ backgroundColor: avatarUploaded ? "#ccc" : "" }}
//                     >
//                       {avatarUploaded ? "Đã tải ảnh lên" : "Tải ảnh lên"}
//                     </Button>
//                   </label>
//                 </Box>
//                 {image && (
//                   <Box
//                     position="relative"
//                     sx={{
//                       mt: 2,
//                       width: 120,
//                       height: 120,
//                     }}
//                   >
//                     <img
//                       src={image}
//                       alt="Avatar"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                     <IconButton
//                       onClick={handleRemoveImage}
//                       sx={{
//                         position: "absolute",
//                         height: 24,
//                         width: 24,
//                         top: -10,
//                         right: -10,
//                         color: "red",
//                         bgcolor: "white",
//                         borderRadius: "50%",
//                         padding: "4px",
//                         boxShadow: 2,
//                       }}
//                     >
//                       <CloseIcon sx={{ height: 16, width: 16 }} />
//                     </IconButton>
//                   </Box>
//                 )}

//                 {errors.avatar && (
//                   <Typography variant="body2" color="error">
//                     {errors.avatar.message}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default FormUsers;
