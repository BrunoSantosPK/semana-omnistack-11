import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import api from "../../services/api"

import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Casos() {
    const navigation = useNavigation();
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navDetalhes(caso) {
        navigation.navigate("Detalhes", { caso });
    }

    async function loadCasos() {
        if(loading) {
            return;
        }

        if(total > 0 && casos.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get("/casos", {
            params: { page }
        });
        setCasos([...casos, ...response.data]);
        setTotal(response.headers["x-total-cont"]);

        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadCasos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.titulo}>Bem-vindo!</Text>
            <Text style={styles.descricao}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={casos}
                style={styles.casosLista}
                keyExtractor={caso => caso.id}
                onEndReached={loadCasos}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: caso }) => (
                    <View style={styles.caso}>
                        <Text style={styles.casoPropriedade}>ONG:</Text>
                        <Text style={styles.casoValor}>{caso.nome}</Text>

                        <Text style={styles.casoPropriedade}>CASO:</Text>
                        <Text style={styles.casoValor}>{caso.titulo}</Text>

                        <Text style={styles.casoPropriedade}>Valor:</Text>
                        <Text style={styles.casoValor}>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(caso.valor)}</Text>

                        <TouchableOpacity onPress={() => navDetalhes(caso)} style={styles.casoBotaoDetalhes}>
                            <Text style={styles.casoBotaoDetalhesTexto}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    );
}