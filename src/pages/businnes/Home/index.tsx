/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import { Box, Center, HStack } from "native-base";
import { PixLogo, XCircle } from "phosphor-react-native";

import { Button } from "@/components/forms/Button";
import { Line } from "@/components/Line";
import { Parceiros } from "@/components/Parceiros";
import { useAuth } from "@/context/auth";
import { useDestaque, useUserWallet } from "@/hooks/querys";
import { Destaque } from "@/pages/communs/Destaque";
import { cor } from "@/styles/cor";
import { _title } from "@/styles/sizes";
import { convertNumberToCurrency } from "@/utils/unidades";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { MenuBox } from "../components/MenuBox";
import { MenuHeader } from "../components/MenuHeader";
import * as S from "./styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

// 171.672.735-97
export function Home() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const { data: wallet, refetch } = useUserWallet();
  const {
    refetch: destaqueRefetch,
    isLoading,
    data: destaque = [],
    isRefetching,
  } = useDestaque();

  const [openScan, setOpneScan] = React.useState<boolean>(false);

  const handleScan = React.useCallback(async (data: BarcodeScanningResult) => {
    setOpneScan(false);
    navigation.navigate("transactions", {
      providerId: data.data,
    });
  }, []);

  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  useFocusEffect(
    useCallback(() => {
      if (!user.locality) {
        navigation.navigate("fullCadastro", {
          type: "extra_cash",
          session: true,
        });
      }
    }, [user])
  );

  function refaching() {
    destaqueRefetch();
    refetch();
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <Box />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <Box>
        <S.title style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </S.title>
        <Button onPress={requestPermission} title="grant permission" />
      </Box>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "back" : "front"));
  }

  const casheback = convertNumberToCurrency(wallet?.amount_cashback ?? 0);

  return (
    <S.Container>
      <MenuHeader />

      {openScan && (
        <Center
          position="absolute"
          top="30%"
          alignSelf="center"
          flex={1}
          mt="12"
        >
          <CameraView
            onBarcodeScanned={(h) => handleScan(h)}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={{
              width: 380,
              height: 300,

              zIndex: 1000,
            }}
            facing={facing}
          >
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => setOpneScan(false)}
            >
              <XCircle size={30} color={cor.focus.a} />
            </TouchableOpacity>
          </CameraView>
        </Center>
      )}

      <Button
        onPress={() => navigation.navigate("BusinnesConfig")}
        title="Minha Empresa"
        styleType="border"
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refaching} />
        }
      >
        <HStack mt="8" alignItems="flex-end" justifyContent="space-between">
          <Box>
            <S.subtitle style={{ fontWeight: "800" }}>Cashback</S.subtitle>
            <S.cash>
              <S.title>{casheback}</S.title>
            </S.cash>
          </Box>

          <Box>
            <S.cash onPress={() => navigation.navigate("cacheOut")}>
              <S.title>SACAR</S.title>
              <PixLogo weight="duotone" />
            </S.cash>
          </Box>
        </HStack>

        <Box mt="8">
          <MenuBox
            presExtrato={() => navigation.navigate("extrato")}
            presBuy={() => {
              toggleCameraFacing();
              setOpneScan(!openScan);
            }}
            presProvider={() => navigation.navigate("providers")}
          />
        </Box>

        <Box mt="8">
          <Line />
        </Box>

        <Box>
          <Parceiros />
        </Box>

        <Box mt="8">
          <S.title
            style={{
              color: cor.focus.a,
              marginBottom: 10,
              fontSize: _title - 3,
            }}
          >
            Destaques
          </S.title>
          <Destaque destaque={destaque} />
        </Box>
      </ScrollView>
    </S.Container>
  );
}

//756.680.809-51
