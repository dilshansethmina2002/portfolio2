"use client";
import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

// NEW FRAGMENT SHADER: Falling Stars / Starfield
const fragmentShaderSource = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;

// Star settings
#define STAR_LAYERS 4.0
#define STAR_SPEED 0.05

// Random function
float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

// Function to create a layer of stars
vec3 StarLayer(vec2 uv, float t) {
    vec2 id = floor(uv);   // Create grid cells
    vec2 gv = fract(uv) - 0.5; // UV within each cell (-0.5 to 0.5)
    
    vec3 col = vec3(0.0);
    
    // Iterate through current cell and neighbors to handle stars crossing boundaries
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 offset = vec2(x, y);
            
            // Random position for star in this neighbor cell
            float n = hash(id + offset);
            
            // Star size based on randomness
            float size = fract(n * 345.32);
            
            // Star position (randomized)
            // We add 't' to y to make them fall, but we do it per star logic below
            float starX = n - 0.5;
            float starY = fract(n * 234.32 + t) - 0.5; // Fall movement
            
            vec2 pos = offset + vec2(starX, starY);
            
            // Distance from current pixel to this star
            float dist = length(gv - pos);
            
            // Draw star (glowy circle)
            // 'm' is the brightness mask
            float m = smoothstep(size * 0.1, size * 0.02, dist);
            
            // Occasional twinkle/shine
            float sparkle = sin(t * 10.0 + n * 6.28) * 0.5 + 1.0;
            
            col += vec3(m * sparkle);
        }
    }
    
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    
    // Base black background
    vec3 col = vec3(0.0, 0.0, 0.05); // Very slight dark blue tint
    
    float t = iTime * 0.2; // Global time multiplier
    
    // Add layers of stars for parallax depth
    for(float i = 0.0; i < 1.0; i += 1.0 / STAR_LAYERS) {
        float depth = fract(i + 1.0);
        float scale = mix(10.0, 0.5, depth);
        float fade = depth * smoothstep(1.0, 0.9, depth);
        
        // Offset time per layer so they move at different speeds (parallax)
        // We subtract t from Y to simulate falling (camera moving up or stars moving down)
        // Actually, let's make the stars move DOWN, so we add Time to the Y coordinate generation in StarLayer
        // But here we scale UVs.
        
        vec3 stars = StarLayer(uv * scale + vec2(i * 43.2, 0.0), t * (depth * 2.0));
        
        col += stars * fade;
    }
    
    // Add a subtle vignette
    float distFromCenter = length(uv);
    float vignette = 1.0 - smoothstep(0.5, 1.5, distFromCenter);
    col *= vignette;

    fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const blurClassMap = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

function ReflectBackground({
  backdropBlurAmount = "none", // Default to none for clear stars
  className = "",
  edgeFade = "0%", // Reduced fade to see stars everywhere
  blendMode = "normal", // Normal blend mode usually looks best for space
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Try to get context
    let gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");

    let startTime = Date.now();
    let animationFrameId;

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform2f(iResolutionLocation, width, height);
      gl.uniform1f(iTimeLocation, currentTime);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const finalBlurClass = blurClassMap[backdropBlurAmount] || blurClassMap["sm"];

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      // Removed the heavy masking defaults so the sky is visible
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          mixBlendMode: blendMode,
        }}
      />
      {backdropBlurAmount !== "none" && (
        <div
          className={`absolute inset-0 pointer-events-none ${finalBlurClass}`}
          aria-hidden
        />
      )}
    </div>
  );
}

export default ReflectBackground;