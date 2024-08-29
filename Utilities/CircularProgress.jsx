const CircularProgress = ({ progress }) => {
    const radius = 40; // Radius of the circle
    const strokeWidth = 10; // Thickness of the circle
    const circumference = 2 * Math.PI * radius; // Circumference of the circle
    const progressOffset = circumference - (progress / 100) * circumference; // Calculate offset for progress
  
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressCircleContainer}>
          {/* Background circle */}
          <View
            style={[
              styles.progressCircle,
              {
                borderWidth: strokeWidth,
                borderColor: "#f3f3f3",
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
              },
            ]}
          />
          {/* Foreground circle (progress) */}
          <View
            style={[
              styles.progressCircle,
              {
                borderWidth: strokeWidth,
                borderColor: "#007BFF",
                width: radius * 2,
                height: radius * 2,
                borderRadius: radius,
                borderStyle: "solid",
                position: "absolute",
                borderRightColor: "transparent",
                borderTopColor: "transparent",
                transform: [{ rotate: `${(progress / 100) * 360}deg` }],
              },
            ]}
          />
          {/* Percentage Text */}
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{`${progress}%`}</Text>
          </View>
        </View>
      </View>
    );
  };
  

  