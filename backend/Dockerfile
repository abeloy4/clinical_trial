FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ClinicalTrial.Api/ClinicalTrial.Api.csproj", "ClinicalTrial.Api/"]
RUN dotnet restore "ClinicalTrial.Api/ClinicalTrial.Api.csproj"
COPY . .
WORKDIR "/src/ClinicalTrial.Api"
RUN dotnet build "ClinicalTrial.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ClinicalTrial.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ClinicalTrial.Api.dll"]
