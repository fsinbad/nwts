import { useForm } from "react-hook-form";
import { useEffect } from "react";

import useUpdateWasteProfileMutation from "./../../../../../requests/request-container-profile/request-waste-profile/use-update-waste-profile-mutation";
import useContainerTypeQuery from "./../../../../../requests/request-container-profile/request-container-type/use-fetch-container-type-query";
import LoadingSpinnerPage from "./../../../../shared/loading-spiner-page";
import AlertWarning from "./../../../../shared/alert-warning";

export default function ModalWasteProfileDetailsUpdate({
  modalContainerTypeData,
  closeModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const {
    data: containerTypeData,
    isLoading: isContainerTypeLoading,
    isError: isContainerTypeError,
  } = useContainerTypeQuery();

  const updateWasteProfileMutation = useUpdateWasteProfileMutation();

  useEffect(() => {
    document.getElementById("modal_update_waste_profile").showModal();
  }, [modalContainerTypeData]);

  const {
    name,
    typeOfWaste,
    wasteDescription,
    risksAndHazards,
    processingMethods,
    physicalProperties,
    chemicalProperties,
    biologicalProperties,
    collectionProcedures,
    containerType,
    id,
  } = modalContainerTypeData;

  const isFormSubmit = async (formData) => {
    // Trim all string values
    const trimmedData = {
      name: formData.name.trim(),
      typeOfWaste: formData.typeOfWaste.trim(),
      wasteDescription: formData.wasteDescription.trim(),
      risksAndHazards: formData.risksAndHazards.trim(),
      processingMethods: formData.processingMethods.trim(),
      physicalProperties: formData.physicalProperties.trim(),
      chemicalProperties: formData.chemicalProperties.trim(),
      biologicalProperties: formData.biologicalProperties.trim(),
      collectionProcedures: formData.collectionProcedures.trim(),
      containerTypeId: parseInt(formData.recommendationsForTransport),
      id,
    };

    try {
      await updateWasteProfileMutation.mutateAsync(trimmedData);
      closeModal();
    } catch (error) {
      console.error("Error updating Waste Profile:", error);

      closeModal();
    }
  };

  if (isContainerTypeLoading) {
    return (
      <dialog id="modal_update_waste_profile" className="modal modal-open">
        <div className="modal-box flex items-center justify-center p-8">
          <LoadingSpinnerPage />
        </div>
      </dialog>
    );
  }

  if (!containerTypeData || isContainerTypeError) {
    return (
      <dialog id="modal_update_waste_profile" className="modal modal-open">
        <div className="modal-box flex items-center justify-center p-8">
          <AlertWarning text={"Error loading container type data"} />
        </div>
      </dialog>
    );
  }

  return (
    <>
      <dialog id="modal_update_waste_profile" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Container Details</h3>

          <div className="modal-action flex flex-col">
            <form
              method="dialog"
              className="flex flex-col items-start space-y-4 pb-4"
              onSubmit={handleSubmit(isFormSubmit)}
            >
              <div className="flex w-64 flex-col space-y-2">
                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Name:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={name}
                    {...register("name", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">Type Of Waste:</label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={typeOfWaste}
                    {...register("typeOfWaste", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Waste Description:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={wasteDescription}
                    {...register("wasteDescription", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Risks And Hazards:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={risksAndHazards}
                    {...register("risksAndHazards", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Processing Methods:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={processingMethods}
                    {...register("processingMethods", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Physical Properties:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={physicalProperties}
                    {...register("physicalProperties", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Chemical Properties:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={chemicalProperties}
                    {...register("chemicalProperties", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Biological Properties:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={biologicalProperties}
                    {...register("biologicalProperties", {
                      required: true,
                    })}
                  />
                </div>

                <div className="flex w-64 flex-col space-y-2">
                  <label className="text-left text-sm">
                    Collection Procedures:
                  </label>
                  <input
                    className="input input-md input-bordered px-2"
                    type="text"
                    placeholder="Type here"
                    defaultValue={collectionProcedures}
                    {...register("collectionProcedures", {
                      required: true,
                    })}
                  />
                </div>

                {/* transport recommendations */}
                <div className="flex w-64 flex-col space-y-2">
                  <label
                    className="text-left text-sm"
                    htmlFor="recommendations-for-transport"
                  >
                    Recommendations For Transport:
                  </label>

                  <select
                    className="select select-bordered select-md px-2"
                    id="recommendations-for-transport"
                    defaultValue={containerType.id}
                    {...register("recommendationsForTransport", {
                      required: true,
                    })}
                  >
                    {containerTypeData.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-x-2">
                <button className="btnSave" type="submit">
                  Save
                </button>
              </div>
            </form>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
