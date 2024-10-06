import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Creating data

export async function POST(req, res) {
  const formData = await req.json();

  const {
    preStorageTemperature,
    preStorageRadiationLevel,
    preStorageHumidity,
    preStoragePressure,
    preStorageLocationId,
    preStorageResponsibleEmployeeId,
  } = formData;

  if (
    !preStorageTemperature ||
    !preStorageRadiationLevel ||
    !preStorageHumidity ||
    !preStoragePressure ||
    !preStorageLocationId ||
    !preStorageResponsibleEmployeeId
  ) {
    return NextResponse.json(
      {
        message: "Backend: All fields are required",
      },
      { status: 400 },
    );
  }

  try {
    await prisma.preStorageConditions.create({
      data: {
        preStorageTemperature: parseFloat(preStorageTemperature),
        preStorageRadiationLevel: parseFloat(preStorageRadiationLevel),
        preStorageHumidity: parseInt(preStorageHumidity),
        preStoragePressure: parseInt(preStoragePressure),
        preStorageLocationId: parseInt(preStorageLocationId),
        preStorageResponsibleEmployeeId: parseInt(
          preStorageResponsibleEmployeeId,
        ),
      },
    });

    return NextResponse.json(
      { message: "New Pre-Storage Conditions add successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Faild to creat Pre-Storage Conditions:", error);
    return NextResponse.json(
      { message: "Faild to add Pre-Storage Conditions" },
      { status: 500 },
      { error: `${error.message}` },
    );
  }
}

// Fetch data

export async function GET() {
  try {
    const preStorageOfWasteData = await prisma.preStorageEntry.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (preStorageOfWasteData.length === 0) {
      return NextResponse.json(
        {
          preStorageOfWasteData: null,
          message: "No PreStorage Of Waste data available.",
        },
        { status: 204 }, // No Content
      );
    }

    return NextResponse.json(
      { preStorageOfWasteData, message: "Data fetched successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch preStorage Of Waste Data.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
