import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, FlatList, Text, Image, TouchableOpacity, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Detalhes() {

    const navegacao = useNavigation();
    const route = useRoute();
    const caso = route.params.caso;
    const mensagem = `Olá ${caso.nome}, estou entrando em contato porque gostaria de ajudar no caso ${caso.titulo}, com o valor de ${Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(caso.valor)}.`;

    function voltar() {
        navegacao.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${caso.titulo}`,
            recipients: ["bruno.19ls@gmail.com"],
            body: mensagem
        });
    }

    function sendZap() {
        Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${mensagem}`);
    }

    return (
        <View style={styles.content}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={voltar}>
                    <Feather name="arrow-left" size={18} color="#e82041"></Feather>
                </TouchableOpacity>
            </View>

            <FlatList
                data={[caso]}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        <View style={styles.caso}>
                            <Text style={[styles.casoPropriedade, { marginTop: 0 }]}>ONG:</Text>
                            <Text style={styles.casoValor}>{caso.nome} de {caso.cidade}/{caso.uf}</Text>

                            <Text style={styles.casoPropriedade}>CASO:</Text>
                            <Text style={styles.casoValor}>{caso.titulo}</Text>

                            <Text style={styles.casoPropriedade}>DESCRIÇÃO:</Text>
                            <Text style={styles.casoValor}>{caso.descricao}</Text>

                            <Text style={styles.casoPropriedade}>Valor:</Text>
                            <Text style={styles.casoValor}>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(caso.valor)}</Text>
                        </View>

                        <View style={styles.caixaContato}>
                            <Text style={styles.contatoTitulo}>Salve o dia!</Text>
                            <Text style={styles.contatoTitulo}>Seja o herói desse caso.</Text>

                            <Text style={styles.contatoDescricao}>Entre em contato</Text>

                            <View style={styles.acoes}>
                                <TouchableOpacity style={styles.acao} onPress={sendZap}>
                                    <Text style={styles.acaoTexto}>WhatsApp</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.acao} onPress={sendMail}>
                                    <Text style={styles.acaoTexto}>E-mail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />

        </View>
    );
}