import { useForm } from "react-hook-form";

import useLocationOriginQuery from "../../../../../requests/request-container-profile/request-location-origin/use-fetch-location-origin-query";
import useWasteProfileQuery from "../../../../../requests/request-container-profile/request-waste-profile/use-fetch-waste-profile-query,";
import useCreateContainerProfileMutation from "../../../../../requests/request-container-profile/use-create-container-profile-mutation";
import LoadingSpinnerButton from "./../../../../shared/loading-spiner-button";

export default function FormContainerProfile({ closeModal, shippingID }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Create data
  const {
    mutateAsync: createContainerProfileMutation,
    isPending,
    isError,
    isSuccess,
  } = useCreateContainerProfileMutation();

  // Fetching data
  const { data: locationOriginData } = useLocationOriginQuery();

  const { data: wasteProfileData } = useWasteProfileQuery();

  const isFormSubmit = async ({
    quantity,
    locationOrigin,
    wasteProfile,
    containerType,
  }) => {
    // Trim whitespace from each field
    const formData = {
      quantity: quantity.trim(),
      locationOriginId: locationOrigin.trim(),
      wasteProfileId: wasteProfile.trim(),
      containerTypeId: containerType.trim(),
      shippingInformationId: shippingID,
    };

    try {
      await createContainerProfileMutation(formData);
      reset();
      closeModal();
    } catch (error) {
      console.error("Error creating Container Profile:", error);
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-start space-y-4"
        onSubmit={handleSubmit(isFormSubmit)}
      >
        <div className="flex flex-col space-y-2">
          {/* Quantity */}
          <label className="text-left text-sm">Quantity:</label>
          <input
            className="input input-md input-bordered px-2"
            type="number"
            placeholder="Type here ..."
            {...register("quantity", {
              required: true,
              min: 1,
            })}
          />
          {errors.example && <p>This is required</p>}
        </div>

        {/* Location origin */}
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm" htmlFor="location-origin">
            Please select location origin
          </label>

          <select
            className="select select-bordered select-md px-2"
            id="location-origin"
            {...register("locationOrigin", { required: true })}
          >
            <option value="">---</option>

            {locationOriginData?.map((origin) => (
              <option key={origin.id} value={origin.id}>
                {origin.name}
              </option>
            ))}
          </select>
        </div>

        {/* Waste profile */}
        <div className="flex w-64 flex-col space-y-2">
          <label className="text-left text-sm" htmlFor="waste-profile">
            Please select waste profile
          </label>

          <select
            className="select select-bordered select-md px-2"
            id="waste-profile"
            {...register("wasteProfile", { required: true })}
          >
            <option value="">---</option>

            {wasteProfileData?.map((waste) => (
              <option key={waste.id} value={waste.id}>
                {waste.name}
              </option>
            ))}
          </select>
        </div>

        <div className=" space-x-2">
          <button className="btnSave" type="submit" disabled={isPending}>
            {isPending ? <LoadingSpinnerButton /> : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}
