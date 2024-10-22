import dynamic from "next/dynamic";

import RequestFromEntry from "./request-from-entry";

import usePendingShippingInformationsQuery from "./../../../../../requests/request-shipping-information/use-fetch-pending-shipping-information-query";

import LoadingSpinnerPage from "../../../../shared/loading-spiner-page";
import AlertWarning from "../../../../shared/alert-warning";

// Dynamically import the CustomPieChart component without server-side rendering
const CustomPieChart = dynamic(
  () => import("./../../../../shared/custom-pie-chart"),
  {
    ssr: false,
  },
);

export default function CapacityDetails({
  preStorageData,
  dataForPieChart,
  freeSpacePercentage,
  freeSpace,
  freeContainers,
  usedSpacePercentage,
  usedSpace,
  totalContainers,
  toggleModal,
}) {
  // Get pending shipping information for this hall
  const {
    data: pendingShippingInformations,
    isLoading,
    isError,
  } = usePendingShippingInformationsQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinnerPage />
      </div>
    );
  }

  if (isError || !pendingShippingInformations) {
    return (
      <div className="flex h-screen items-center justify-center">
        <AlertWarning text={"Error loading PreStorage request"} />
      </div>
    );
  }

  // Get the waste type or container type for the current hall
  const hallContainerType = preStorageData.containerType;

  // Filter the pending shipping informations for this hall
  const filteredPendingShippingInformations =
    pendingShippingInformations.filter((info) =>
      info.containerProfiles.some(
        (profile) => profile.wasteProfile.name === hallContainerType,
      ),
    );

  // Map through filtered shipping informations and calculate total quantity
  const requestQuantity = filteredPendingShippingInformations.map(
    (shippingInfo) => {
      // Get the total quantity of containers of the relevant wasteProfile type
      const totalQuantity = shippingInfo.containerProfiles.reduce(
        (sum, profile) =>
          profile.wasteProfile.name === hallContainerType
            ? sum + profile.quantity
            : sum,
        0,
      );

      return {
        totalQuantity,
        companyName: shippingInfo.companyName,
        registrationPlates: shippingInfo.registrationPlates,
        status: shippingInfo.status,
      };
    },
  );

  // Check if there are any pending requests
  const hasPendingRequests = requestQuantity.length > 0;

  return (
    <div className="flex flex-col ">
      {/* Display pie chart and usage information */}
      <div className="mb-6 flex w-full flex-row space-x-12">
        {/* Pie chart with transition effects */}
        <div className="flex flex-row items-center justify-evenly">
          <div className="transform transition-transform duration-700 ease-in-out hover:scale-110">
            <CustomPieChart data={dataForPieChart} />
          </div>
        </div>

        {/* Display free and used space information */}
        <div className="flex flex-col space-y-8">
          <InfoBox
            label="Free space"
            color="green"
            percentage={freeSpacePercentage}
            space={freeSpace}
            containers={freeContainers}
          />
          <InfoBox
            label="Used space"
            color="red"
            percentage={usedSpacePercentage}
            space={usedSpace}
            containers={totalContainers}
          />
        </div>
      </div>

      {/* Button to open the Capacity modal */}
      <button
        className="btn btn-outline btn-info mb-5  transition delay-75 duration-200 ease-in-out hover:-translate-y-1 hover:scale-105"
        onClick={() => toggleModal()}
      >
        Update Capacity State
      </button>

      {/* Open Request Drawer */}
      {hasPendingRequests && (
        <div className="alert alert-warning flex  flex-col items-center justify-center text-center">
          <div className="flex flex-row space-x-2">
            <p>You have</p>
            <p className="font-semibold">
              {filteredPendingShippingInformations.length}
            </p>
            <p> new requests!</p>
          </div>
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content static">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-info drawer-button z-0 text-white"
              >
                Show Requests
                <span className="relative -top-6 left-6 right-6 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500"></span>
                </span>
              </label>
            </div>
            <div className="drawer-side z-10">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <div className="menu min-h-full w-1/2 bg-base-200 p-4 text-base-content">
                {/* Sidebar content here */}
                {requestQuantity.map((i) => (
                  <RequestFromEntry request={i} />
                ))}
                <div className="mt-10 flex justify-end">
                  <label
                    htmlFor="my-drawer"
                    className="btnCancel drawer-button w-32"
                  >
                    Close
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// InfoBox component to display information about free or used space
function InfoBox({ label, color, percentage, space, containers }) {
  return (
    <div
      className={`flex transform flex-col items-center rounded-md border-4 transition-transform duration-500 ease-in-out hover:scale-105 border-${color}-500`}
    >
      <div className="my-4 flex flex-row items-center space-x-3">
        <div>
          <p>{label}</p>
        </div>
        {/* Colored indicator box */}
        <div className={`h-4 w-4 rounded bg-${color}-500`}></div>
      </div>
      {/* Table displaying the percentage, space in m2, and number of containers */}
      <table className="table">
        <tbody>
          <tr className="flex justify-around">
            <td>{percentage} %</td>
            <td>{space} m2</td>
            <td>{containers} Containers</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
