import { useState, useEffect } from "react";
import { Direction } from "@/src/gen/protobuf/game_pb";

export default function useGame(gameClient: any, roomClient: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roomID, setRoomID] = useState<string | null>(null);
  const [serverName, setServerName] = useState<string | null>(null);
  const [userID, setUserID] = useState<number | null>(null);
  console.log(
    `[useGame] roomID:${roomID} serverName:${serverName} userID:${userID}`,
  );

  useEffect(() => {
    const checkGameIsAlive = async (roomID: string, serverName: string) => {
      try {
        const request = {
          roomId: roomID,
          serverName: serverName,
        };
        // TODO: checkGameAliveメソッドを作る
        // const response = await gameClient.checkGameAlive(request);
        const response = { isAlive: true };
        console.log("Check Game Alive Response:", response);
        const isAlive = response.isAlive;

        return isAlive;
      } catch (error) {
        console.error("Error calling checkGameAlive:", error);
        setError("Error calling checkGameAlive");
      }
    };

    const registerPlayer = async (roomID: string, _serverName: string) => {
      try {
        const request = {
          roomId: roomID,
          // serverName: serverName,
        };
        const response = await roomClient.joinRoom(request);
        console.log("Register Player Response:", response);
        const userID = response.userId;
        localStorage.setItem("roomID", roomID);
        localStorage.setItem("userID", userID.toString());
        return userID;
      } catch (error) {
        console.error("Error calling checkGameAlive:", error);
        setError("Error calling checkGameAlive");
        return null;
      }
    };

    const initialize = async () => {
      const url = new URL(window.location.href);
      const paramRoomID = url.searchParams.get("roomID") || null;
      const paramServerName = url.searchParams.get("serverName") || null;
      console.log("paramRoomID", paramRoomID);
      console.log("paramServerName", paramServerName);

      if (paramRoomID === null) {
        setIsLoading(false);
        setError("roomID is required");
        return;
      }
      if (paramServerName === null) {
        setIsLoading(false);
        setError("serverName is required");
        return;
      }

      const isGameAlive = await checkGameIsAlive(paramRoomID, paramServerName);
      if (!isGameAlive) {
        setIsLoading(false);
        setError("Game is not alive");
        return;
      }

      // localStorageから情報を取得
      const storedRoomID = localStorage.getItem("roomID");
      const storedUserIDString = localStorage.getItem("userID");
      const storedUserID = storedUserIDString
        ? parseInt(storedUserIDString)
        : null;

      if (storedRoomID === paramRoomID && storedUserID !== null) {
        console.log("User already registered");
        setRoomID(paramRoomID);
        setServerName(paramServerName);
        setUserID(storedUserID);
        setIsLoading(false);
        return;
      }

      const fetchedPlayerID = await registerPlayer(
        paramRoomID,
        paramServerName,
      );

      if (fetchedPlayerID === null) {
        setIsLoading(false);
        setError("Failed to register player");
        return;
      }

      setRoomID(paramRoomID);
      setServerName(paramServerName);
      setUserID(fetchedPlayerID);
      setIsLoading(false);
    };

    initialize();
  }, [setIsLoading, setError, setRoomID, setServerName, setUserID]);

  const handleMove = async ({
    userID,
    direction,
    roomID,
  }: {
    userID: number;
    direction: Direction;
    roomID: string;
  }) => {
    try {
      const request = {
        userId: userID,
        direction: direction,
        roomId: roomID,
      };

      // Moveメソッドを呼び出す
      const response = await gameClient.move(request);

      // レスポンスを保存
      console.log("Move Response:", response); // コンソールにレスポンスを表示
    } catch (error) {
      console.error("Error calling Move:", error); // エラーハンドリング
      setError("Error calling Move");
    }
  };

  const onArrowButtonTouchStart = (direction: Direction) => {
    if (!userID) {
      setError("userID is null");
      return;
    }
    if (!roomID) {
      setError("roomID is null");
      return;
    }
    const request = {
      userID: userID,
      direction: direction,
      roomID: roomID,
    };
    handleMove({ ...request });
    console.log("onArrowButtonTouchStart", direction);
  };

  const handlePushButton = async ({
    userID,
    roomID,
  }: {
    userID: number;
    roomID: string;
  }) => {
    try {
      const request = {
        userId: userID,
        roomId: roomID,
      };

      console.log("Push Button Request:", request); // コンソールにリクエストを表示

      // TODO: errorはいてる
      const response = await gameClient.pushButton(request);

      // レスポンスを保存
      console.log("Push Button Response:", response); // コンソールにレスポンスを表示
    } catch (error) {
      console.error("Error calling Push Button:", error); // エラーハンドリング
      setError("Error calling Push Button");
    }
  };

  const handleReleaseButton = async ({
    userID,
    roomID,
  }: {
    userID: number;
    roomID: string;
  }) => {
    try {
      const request = {
        userId: userID,
        roomId: roomID,
      };

      // Releaseメソッドを呼び出す
      const response = await gameClient.releaseButton(request);

      // レスポンスを保存
      console.log("Release Button Response:", response); // コンソールにレスポンスを表示
    } catch (error) {
      console.error("Error calling Release Button:", error); // エラーハンドリング
      setError("Error calling Release Button");
    }
  };
  const onMainButtonTouchStart = () => {
    if (!userID) {
      setError("userID is null");
      return;
    }
    if (!roomID) {
      setError("roomID is null");
      return;
    }
    const request = {
      userID: userID,
      roomID: roomID,
    };
    handlePushButton({ ...request });
  };
  const onMainButtonTouchEnd = () => {
    if (!userID) {
      setError("userID is null");
      return;
    }
    if (!roomID) {
      setError("roomID is null");
      return;
    }
    const request = {
      userID: userID,
      roomID: roomID,
    };
    handleReleaseButton({ ...request });
  };

  return {
    isLoading,
    error,
    userID: userID || 0,
    onArrowButtonTouchStart,
    onMainButtonTouchStart,
    onMainButtonTouchEnd,
  };
}
