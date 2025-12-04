import { useEffect, useState } from "react";
import { MapView } from "@/components/Map";
import { trpc } from "@/lib/trpc";
import { Loader2, MapPin } from "lucide-react";

export default function MapSection() {
  const { data: collectionPoints, isLoading } = trpc.collectionPoints.list.useQuery();
  const [mapReady, setMapReady] = useState(false);

  // Default collection points for Parnaíba-PI
  const defaultPoints = [
    {
      id: 1,
      name: "Senac Parnaíba",
      latitude: "-3.0950",
      longitude: "-41.7700",
      address: "Conjunto Jardim Vitória, Qu 5, 8 - Parnaíba - PI",
      city: "Parnaíba",
      state: "PI",
      description: "Centro de coleta e educação ambiental - Projeto NUMATU",
    },
  ];

  const points = collectionPoints && collectionPoints.length > 0 ? collectionPoints : defaultPoints;

  return (
    <section id="map" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pontos de <span className="text-green-600">Coleta</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visualize os pontos de coleta otimizados pela NUMATU na região de Parnaíba-PI. Encontre o mais próximo de você.
          </p>
        </div>

        {/* Map Container */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 mb-12">
          {isLoading ? (
            <div className="w-full h-96 lg:h-[500px] flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                <p className="text-gray-600">Carregando mapa...</p>
              </div>
            </div>
          ) : (
            <MapView
              onMapReady={(map: google.maps.Map) => {
                setMapReady(true);
                // Center map on Parnaíba
                const parnaibaBounds = new google.maps.LatLngBounds(
                  new google.maps.LatLng(-3.15, -41.85),
                  new google.maps.LatLng(-3.05, -41.65)
                );
                map.fitBounds(parnaibaBounds);

                // Add markers for collection points
                points.forEach((point) => {
                  const marker = new google.maps.Marker({
                    position: {
                      lat: parseFloat(point.latitude),
                      lng: parseFloat(point.longitude),
                    },
                    map,
                    title: point.name,
                    icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  });

                  const infoWindow = new google.maps.InfoWindow({
                    content: `
                      <div class="p-4 max-w-xs">
                        <h3 class="font-bold text-gray-900 mb-2">${point.name}</h3>
                        <p class="text-sm text-gray-600 mb-2">${point.address}</p>
                        <p class="text-sm text-gray-700">${point.description}</p>
                      </div>
                    `,
                  });

                  marker.addListener("click", () => {
                    infoWindow.open(map, marker);
                  });
                });
              }}
            />
          )}
        </div>

        {/* Collection Points List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point) => (
            <div
              key={point.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <h3 className="font-semibold text-gray-900 text-lg">{point.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{point.address}</p>
              <p className="text-sm text-gray-700 italic">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
